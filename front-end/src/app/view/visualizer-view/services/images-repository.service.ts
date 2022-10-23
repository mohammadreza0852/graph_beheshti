import {Injectable} from '@angular/core';
import {NodeImageApiService} from '../../../api/node-image-api.service';

@Injectable()
export class ImagesRepositoryService {
    private imageUrlByTypes = new Map<string, string>();

    public constructor(private nodeImageApiService: NodeImageApiService) {}

    public async getImage(type: string): Promise<string> {
        if (!this.imageUrlByTypes.has(type)) {
            const imageUrl = await this.nodeImageApiService.getImageByType(type)

            this.imageUrlByTypes.set(type, imageUrl);
        }

        return this.imageUrlByTypes.get(type) as string;
    }
}
