export class GraphDto {
    public id!: number;
    public firstNodeType!: string;
    public firstNodeId!: number;
    public secondNodeType!: string;
    public secondNodeId!: number;
    public description!: string;
    public dataset!: number;

    public constructor(graphDto: any) {
        this.id = graphDto.id;
        this.firstNodeType = graphDto.first_node_type;
        this.firstNodeId = graphDto.first_node_id;
        this.secondNodeType = graphDto.second_node_type;
        this.secondNodeId = graphDto.second_node_id;
        this.description = graphDto.description;
        this.dataset = graphDto.dataset;
    }
}
