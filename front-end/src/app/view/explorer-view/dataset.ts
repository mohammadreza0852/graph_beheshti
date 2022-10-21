import {DatasetDto} from '../../api/models/dataset-dto';

export class Dataset {
    public id!: number;
    public fileName!: string;

    public constructor(dataset: DatasetDto) {
        this.id = dataset.id;
        this.fileName = dataset.fileName;
    }
}