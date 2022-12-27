export class NodeCustomFilterDto {
    public id!: string;
    public title!: string;
    public nodeType!: string;
    public fieldName!: string;
    public minValue!: number;
    public maxValue!: number;

    public constructor(customFilterDto: any) {
        this.id = customFilterDto.id;
        this.title = customFilterDto.title;
        this.nodeType = customFilterDto.node_type;
        this.fieldName = customFilterDto.fieldName;
        this.minValue = customFilterDto.min_value;
        this.maxValue = customFilterDto.max_value;
    }
}
