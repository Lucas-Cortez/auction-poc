export interface PaginationOptions {
  skip?: number;
  take?: number;
  startTime?: Date;
  endTime?: Date;
}

export interface PaginatedOutput {
  take: number;
  skip: number;
  total: number;
}
