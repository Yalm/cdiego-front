import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
    name: string;
    children?: FoodNode[];
    icon?: string;
    link?: string;
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Inicio',
        icon: 'home',
        link: '/'
    },
    {
        name: 'Catalogo',
        icon: 'store',
        children: [
            { name: 'Productos', link: '/products' },
            { name: 'Categorías', link: '/categories' }
        ]
    },
    {
        name: 'Clientes',
        icon: 'group',
        link: '/customers'
    },
    {
        name: 'Usuarios',
        icon: 'contacts',
        link: '/users'
    },
    {
        name: 'Pedidos',
        icon: 'shopping_basket',
        link: '/orders'
    },
    {
        name: 'Reportes',
        icon: 'table_chart',
        children: [
            { name: 'Clientes', link: '/reports/customers' },
            { name: 'Productos', link: '/reports/products' },
            { name: 'Pedidos', link: '/reports/purchases' }
        ]
    }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    icon: string;
    link?: string;
}


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    fillerNav = Array.from({ length: 10 }, (_, i) => `Nav Item ${i + 1}`);
    user: User;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public readonly auth: AuthService,
        public readonly router: Router
    ) {
        this.user = this.auth.getPayload();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.dataSource.data = TREE_DATA;
    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            icon: node.icon,
            link: node.link
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    logout() {
        this.auth.removeToken();
        this.router.navigateByUrl('/login');
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
