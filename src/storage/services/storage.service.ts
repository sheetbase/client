import {OptionService} from '../../lib/services/option.service';
import {ApiService} from '../../api/services/api.service';

import {
  FileReaderResult,
  FileInfo,
  UploadFile,
  UploadResource,
  RenamePolicy,
  FileSharing,
  FileUpdateData,
} from '../types/storage.type';

export class StorageService {
  private myApiService: ApiService;

  constructor(
    private optionService: OptionService,
    private apiService: ApiService
  ) {
    this.myApiService = this.apiService
      .extend()
      .setEndpoint(
        this.optionService.getOptions().storageEndpoint || 'storage'
      );
  }

  private base64Parser(base64Value: string) {
    const [header, body] = base64Value.split(';base64,');
    const mimeType = header.replace('data:', '');
    const size = body.replace(/=/g, '').length * 0.75; // bytes
    return {mimeType, size, base64Body: body};
  }

  private isValidType(mimeType: string) {
    const {storageAllowTypes: allowTypes} = this.optionService.getOptions();
    return !allowTypes || allowTypes.indexOf(mimeType) > -1;
  }

  private isValidSize(sizeBytes: number) {
    const {storageMaxSize: maxSize} = this.optionService.getOptions();
    const sizeMB = sizeBytes / 1000000;
    return !maxSize || maxSize === 0 || sizeMB <= maxSize;
  }

  private validateUploadFile(fileData: UploadFile) {
    let error: undefined | string;
    // check file data
    if (!fileData || !fileData.base64Value || !fileData.name) {
      error = 'Missing upload data.';
    } else {
      const {mimeType, size} = this.base64Parser(fileData.base64Value);
      // check type and size
      if (!this.isValidType(mimeType)) {
        error = 'Invalid file type.';
      } else if (!this.isValidSize(size)) {
        error = 'Invalid file size.';
      }
    }
    // throw error
    if (error) {
      throw new Error(error);
    }
  }

  info(id: string, cacheTime = 1440) {
    return this.myApiService.get<FileInfo>('/', {id}, cacheTime);
  }

  upload(
    fileData: UploadFile,
    customFolder?: string,
    renamePolicy?: RenamePolicy,
    sharing: FileSharing = 'PRIVATE'
  ): Promise<FileInfo> {
    this.validateUploadFile(fileData);
    // build the request body
    const body = {file: fileData} as Record<string, unknown>;
    if (customFolder) {
      body.folder = customFolder;
    }
    if (renamePolicy) {
      body.rename = renamePolicy;
    }
    if (sharing) {
      body.share = sharing;
    }
    return this.myApiService.put('/', {}, body);
  }

  uploadMultiple(uploadResources: UploadResource[]): Promise<FileInfo[]> {
    for (let i = 0; i < uploadResources.length; i++) {
      const {file: fileData} = uploadResources[i];
      this.validateUploadFile(fileData);
    }
    return this.myApiService.put('/', {}, {files: uploadResources});
  }

  update(id: string, data: FileUpdateData): Promise<{done: true}> {
    return this.myApiService.post('/', {}, {id, data});
  }

  remove(id: string): Promise<{done: true}> {
    return this.myApiService.delete('/', {}, {id});
  }

  read(_file: File): Promise<FileReaderResult> {
    return new Promise((resolve, reject) => {
      // check errors
      if (!this.isValidType(_file.type)) {
        return reject('Invalid file type.');
      }
      if (!this.isValidSize(_file.size)) {
        return reject('Invalid file size.');
      }
      // read the file
      const reader = new FileReader();
      reader.onload = (e: unknown) => {
        const {name, size, type: mimeType, lastModified} = _file;
        const base64Value = (e as {target: {result: string}}).target.result;
        resolve({_file, name, size, mimeType, lastModified, base64Value});
      };
      reader.readAsDataURL(_file);
    });
  }
}
