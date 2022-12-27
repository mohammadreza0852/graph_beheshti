export class CustomFilterDto {
    public id!: string;
    public title!: string;
    public firstNodeType!: string;
    public secondNodeType!: string;
    public minRelations!: number;
    public maxRelations!: number;

    public constructor(customFilterDto: any) {
        this.id = customFilterDto.id;
        this.title = customFilterDto.title;
        this.firstNodeType = customFilterDto.first_node_type;
        this.secondNodeType = customFilterDto.second_node_type;
        this.minRelations = customFilterDto.min_relations;
        this.maxRelations = customFilterDto.max_relations;
    }
}
