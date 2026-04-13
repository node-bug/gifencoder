export interface GifOptions {
  width: number;
  height: number;
}

export class Gif {
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number);

  addImage(path: string): Promise<boolean>;
  addBuffer(data: string): Promise<boolean>;
  addImages(paths: string[]): Promise<PromiseSettledResult<boolean>[]>;
  save(path?: string): Promise<Buffer | void>;
}

export default Gif;