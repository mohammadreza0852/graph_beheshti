import {Injectable} from '@angular/core';
import {NodeImageApiService} from '../../../api/node-image-api.service';

@Injectable()
export class ImagesRepositoryService {
    private imageUrlByTypes = new Map<string, string | null>();

    public constructor(private nodeImageApiService: NodeImageApiService) {}

    public async getImage(type: string): Promise<string> {
        if (!this.imageUrlByTypes.has(type)) {
            try {
                const imageUrl = await this.nodeImageApiService.getImageByType(type)
                this.imageUrlByTypes.set(type, imageUrl);
            } catch {
                this.imageUrlByTypes.set(type, null);
            }
        }

        return this.imageUrlByTypes.get(type) as string;
    }
}
