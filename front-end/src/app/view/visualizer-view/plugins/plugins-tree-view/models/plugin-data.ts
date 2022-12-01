import {Subject} from "rxjs";

export class PluginData {
    public name!: string;
    public disabled?: boolean;
    public expandable!: boolean;
    public children?: PluginData[];
    public subject?: Subject<void>;
}
