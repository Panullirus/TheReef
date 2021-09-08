import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmpleadosService } from 'src/app/services/empleados.service';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  loading = false;
  constructor(private _empleadoService: EmpleadosService) { 

}  

  ngOnInit(): void {
    this.getEmpleados()
  }

 
  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados = [];
      data.forEach((element: any) =>{
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string){
    let confirmacion = prompt("Escribe si para eliminar al empleado")
    if(confirmacion === "si"){
      this._empleadoService.eliminarEmpleado(id).then(() =>{
        console.log('Empleado eliminado')
      }).catch(err =>{
        console.log(err);
      })
    }else{

    }
  }
}
