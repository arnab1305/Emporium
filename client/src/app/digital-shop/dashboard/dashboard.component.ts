import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
  cnfemail: string = ''
  userShopData = []
  check:boolean
  products=[]
  orderDets = []
  pieDets = []
  length = 0
  shop_id :Number
  janAmount = 0;febAmount = 0;marAmount = 0;aprAmount = 0;mayAmount =0;junAmount = 0;julAmount = 0;augAmount = 0;sepAmount = 0;octAmount = 0;novAmount = 0;decAmount = 0;
  constructor(private breakpointObserver: BreakpointObserver,
    private _token : TokenStorageService,
    private _router : Router,
    private _auth : AuthService,
    private _active : ActivatedRoute,
    private _product : ProductService
    ) {}

    title = 'Amount (in thousands)';
    type = 'ColumnChart';
    data = []
    columnNames = ['Year', 'Asia'];
    options = { };
    width = 1150;
    height = 275;

    title2 = 'Revenue Split in this Month';
    type2 = 'PieChart';
    data2 = [];
    columnNames2 = ['Category', 'Percentage Share'];
    options2 = {
    };
    width2 = 500;
    height2 = 300;

    ngOnInit(){

      this.cnfemail = this._active.snapshot.paramMap.get('email')
      this._token.currentCnfEmail.subscribe( msg =>  this.cnfemail = msg);
      this._auth.getShopData(this.cnfemail).subscribe(
        (res: any) => {
          console.log(res);
          this.userShopData = res;
          this.shop_id = this.userShopData['shop_id']
          if(this.userShopData['shop_id']!=0){

            this.check = false

          }
        },
        (err) => {
          console.log(err);
        }
      );


      this._product.getOrderDetail(this.cnfemail).subscribe(
        (res: any) => {
          this.orderDets = res
          this.data = [

            ["Jan", this.orderDets['Jan']/1000],
            ["Feb", this.orderDets['Feb']/1000],
            ["Mar", this.orderDets['Mar']/1000],
            ["Apr", this.orderDets['Apr']/1000],
            ["May", this.orderDets['May']/1000],
            ["Jun", this.orderDets['Jun']/1000],
            ["Jul", this.orderDets['Jul']/1000],
            ["Aug", this.orderDets['Aug']/1000],
            ["Sep", this.orderDets['Sep']/1000],
            ["Oct", this.orderDets['Oct']/1000],
            ["Nov", this.orderDets['Nov']/1000],
            ["Dec", this.orderDets['Dec']/1000],

          ]


        },
        (err) => {
          console.log(err);
        }
      );
      this._product.getPieDetail(this.cnfemail).subscribe(
        (res: any) => {
          this.pieDets = res
          this.data2= [

            ['Vehicles', this.pieDets['cat1']],
            ['Stationary', this.pieDets['cat2']],
            ['Book',this.pieDets['cat3']]

          ]


        },
        (err) => {
          console.log(err);
        }
      );

    }

    submit(){

      this._router.navigate(['/create-shop'])

    }
    forward(){

      this._router.navigate(['shop/TeM1oF5/'+this.cnfemail])

    }


}




