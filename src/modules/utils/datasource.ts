export interface DataSource<T, DTO> {
    find(): Promise<T[]>;

    get(entityId: string): Promise<T>;

    create(data: DTO): Promise<T>;
}