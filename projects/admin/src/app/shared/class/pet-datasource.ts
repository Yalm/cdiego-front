import { MatPaginator, MatSort, Sort, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge } from 'rxjs';
import { map, tap, switchMap, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { flatten } from 'q-flat';

export class PetDataSource<T> extends DataSource<T> {

    private query: any = {};
    protected load: boolean;
    data: T[];

    set filter(value: string) {
        if (value) {
            this.query.search = value;
        } else {
            delete this.query.search;
        }
        this.change.next(true);
    }

    set params(value: Params) {
        this.query = Object.assign(this.query, value);
        this.change.next(true);
    }

    set paginator(value: MatPaginator) {
        this.options.paginator = value;
        this.connect();
    }

    set sort(value: MatSort) {
        this.options.sort = value;
        this.connect();
    }

    set http(value: HttpClient) {
        this.options.http = value;
        this.connect();
    }

    private change = new EventEmitter<boolean>();

    constructor(private options: {
        url: string,
        http: HttpClient,
        paginator?: MatPaginator,
        sort?: MatSort,
        params?: Params
    }) {
        super();
        this.params = this.options.params || {};
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        const dataMutations: EventEmitter<boolean | Sort | PageEvent>[] = [
            this.change
        ];

        if (this.options.paginator) {
            dataMutations.push(this.options.paginator.page);
        }

        if (this.options.sort) {
            dataMutations.push(this.options.sort.sortChange);
        }

        return merge(...dataMutations)
            .pipe(
                startWith({}),
                switchMap(() => this.getData())
            );
    }

    private getData(): Observable<T[]> {
        if (this.options.sort && this.options.sort.active) {
            if (this.query.order && !this.query.order.hasOwnProperty(this.options.sort.active) && this.options.paginator) {
                this.options.paginator.pageIndex = 0;
            }
            this.query.order = { [this.options.sort.active]: this.options.sort.direction };
        }

        if (this.options.paginator) {
            this.query.skip = this.options.paginator.pageIndex * this.options.paginator.pageSize;
            this.query.take = this.options.paginator.pageSize;
        }

        this.load = true;
        return this.options.http.get<[T[], number]>(this.options.url, {
            params: flatten(this.query)
        }).pipe(
            tap(([data, total]) => {
                if (this.options.paginator) {
                    this.options.paginator.length = total;
                }
                this.data = data;
                this.load = false;
            }, () => {
                this.load = false;
            }),
            map(([data]) => data)
        );
    }
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

    destroy(id: number | string): void {
        this.options.http.delete(`${this.options.url}/${id}`).subscribe(() => {
            this.change.next(true);
        });
    }
}
