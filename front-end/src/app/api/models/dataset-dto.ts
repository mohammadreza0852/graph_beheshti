export class DatasetDto {
    public id!: number;
    public fileName!: string;

    public constructor(datasetDto: any) {
        this.id = datasetDto.id;
        this.fileName = datasetDto.filename;
    }
}