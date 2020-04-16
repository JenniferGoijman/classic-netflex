import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { MatGoogleMapsAutocompleteModule, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { Title } from '@angular/platform-browser';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader } from '@agm/core';

declare var google;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  movie;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private _formBuilder: FormBuilder,
    public cartService: CartService,
    public userService: UserService,
    public orderService: OrderService,
    private titleService: Title,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.movie = this.cartService.moviesInCart[0];

    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  insertOrder(event: any) {
    const token = localStorage.getItem('authToken')
    const arrProducts = []
    let i = 0;

    for (const product of this.cartService.moviesInCart) {
      const arrProduct = [product.id, event.target[i].value]
      arrProducts.push(arrProduct);
      i++;
    }

    var today = new Date();
    const order = {
      "deliveryDate": today.toLocaleDateString().split('/').reverse().join('-') + ' ' + today.toLocaleTimeString(),
      "status": "pending",
      "UserId": this.userService.getUser(),
      "products": arrProducts
    }
    console.log(token, order)

    this.orderService.insert(token, order)
      .subscribe(res => { res; },
        error => console.error(error));

    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];

  }

  deleteProduct(productId, event) {
    event.target.parentNode.parentNode.remove()
    const productsFiltered = this.cartService.moviesInCart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(productsFiltered));
    this.cartService.moviesInCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }

  closeDetails() {
    this.movie = '';
  }

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} min`;
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }
}
