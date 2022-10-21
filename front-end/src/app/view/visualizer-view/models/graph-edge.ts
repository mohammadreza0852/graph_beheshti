export class GraphEdge {
    public graphId!: string;
    public source!: string;
    public target!: string;

    public constructor(source: string, target: string) {
        this.source = source;
        this.target = target;

        this.graphId = `${source}${target}`;
    }
}
