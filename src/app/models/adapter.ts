export interface Adapter<T> {
    adapt(item: any, item2: any, item3: any, item4: any): T;
}
