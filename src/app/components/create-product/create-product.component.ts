import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10)
    ])
  })

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {
  }

  get title() {
    return this.form.controls.title as FormControl
  }

  submit() {
    console.log(this.form.value)
    this.productService.create({
        title: this.form.value.title as string,
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        rating: {
          rate: 4.1,
          count: 24
        }
      }).subscribe(()=>{
        this.modalService.close()
    })
  }


  ngOnInit(): void {
  }
}
