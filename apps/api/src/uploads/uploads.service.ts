import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UploadsService {
  private logger = new Logger(UploadsService.name);

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  async uploadImage(image: Express.Multer.File) {
    const formData = new FormData();
    formData.append('image', image.buffer.toString('base64'));
    const { data } = await firstValueFrom(
      this.httpService
        .post<{ data: { url: string } }>(
          `https://api.imgbb.com/1/upload?expiration=600&key=${this.configService.get(
            'IMGBB_API_KEY'
          )}`,
          formData
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new InternalServerErrorException(error.response.data);
          })
        )
    );

    return data.data.url;
  }
}
