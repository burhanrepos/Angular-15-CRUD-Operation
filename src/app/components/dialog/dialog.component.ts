import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { forbiddenNameValidator } from 'src/app/services/product-name.validators';
import { PasswordValidator } from 'src/app/services/password.validator';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList=['Brand New','Second Hand','Refurbished']
  fProductForm !:FormGroup;
  actionBtn:string="Save"
  constructor(private formBuilder:FormBuilder,
    private oDataService:DataService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.DialogComponent_InitializeForm();
    console.log("Edit data======",this.editData);
    if(this.editData)
    {
      this.actionBtn="Update"
      for(const [key,value] of Object.entries(this.editData))
        if(key!='id')
          this.fProductForm.controls[key].setValue(value)
    }
    
  }
  DialogComponent_InitializeForm()
  {
    this.fProductForm=this.formBuilder.group({
      productName:['',[Validators.required,forbiddenNameValidator(/burhan/)]],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
    },{validator:PasswordValidator})
  }
  //<small class='text-danger' *ngIf='form.errors?.misMatch'>Password</small>
  DialogComponent_SaveAddProduct()
  {
    if(!this.editData)
    {
      console.log(this.fProductForm.value) 
      if(this.fProductForm.valid)
      {
        this.oDataService.DataService_PostProduct(this.fProductForm.value).subscribe({
          next:(result)=>{
            alert("Product Added Successfully");
            this.dialogRef.close('save')
            this.fProductForm.reset()
          },
          error:(error)=>{
            alert(error);
            this.dialogRef.close()
            this.fProductForm.reset()
  
          }
        })
      }
    }else this.DialogComponent_UpdateProduct();
    
  }

  DialogComponent_UpdateProduct()
  {
    this.oDataService.DataService_PutProduct(this.fProductForm.value,this.editData.id).subscribe({
      next:(result)=>{
        alert("Product Added Successfully");
        this.dialogRef.close('update')
        this.fProductForm.reset()
      },
      error:(error)=>{
        alert(error);
        this.dialogRef.close()
        this.fProductForm.reset()

      }
    })
  }

}
