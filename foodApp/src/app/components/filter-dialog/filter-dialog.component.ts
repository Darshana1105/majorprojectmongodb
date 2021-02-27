import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/utilities/category.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {

  categoriesForm: FormGroup;

  categoryData: Array<any> = [];

  get categoriesFormArray() {
    return this.categoriesForm.controls.categories as FormArray;
  }


  constructor(private _categoryService: CategoryService, private dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.categoriesForm = new FormGroup({
      categories: new FormArray([])
    });
    this._categoryService.getCategoryList().subscribe((result) => {
      this.categoryData = result
      this.addCheckboxes(data);
    }, (err) => {
      console.log(err.message);

    })

  }
  ngOnInit(): void {

  }


  formControlOf(index: number) {
    return this.categoriesFormArray.controls[index] as FormControl;
  }


  private addCheckboxes(data:any) {

    this.categoryData.forEach((item) => {
      data.find
      this.categoriesFormArray.push(new FormControl(false))
    });
  }



  submit() {
    const selectedCategories = this.categoriesForm.value.categories
      .map((checked: any, i: number) => checked ? this.categoryData[i].categoryName : null)
      .filter((v: any) => v !== null);

    console.log(selectedCategories);
  }

}
