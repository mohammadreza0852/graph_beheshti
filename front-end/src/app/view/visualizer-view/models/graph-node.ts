export class GraphNode {
    public graphId!: string;
    public id!: number;
    public type!: string;

    public constructor(id: number, type: string) {
        this.id = id;
        this.type = type;

        this.graphId = `${id}${type}`;
    }
}
