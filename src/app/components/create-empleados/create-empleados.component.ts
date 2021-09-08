import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar empleado';

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadosService, private router: Router, private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numeroColaborador: ['', Validators.required],
      correo: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.esEmpleado();
  }

  agregarEditarEmpleado(){
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return;
    }
    if(this.id === null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      numeroColaborador: this.createEmpleado.value.numeroColaborador,
      correo: this.createEmpleado.value.correo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() =>{
      console.log('empleado agregado');
      this.loading = false; 
      this.router.navigate(['/list-empleados']);
    }).catch(err => {
      console.log(err);
      this.loading = false;
    })
  }

  editarEmpleado(id: string){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      numeroColaborador: this.createEmpleado.value.numeroColaborador,
      correo: this.createEmpleado.value.correo,
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(()=>{
      this.loading;
    });
    this.router.navigate(['/list-empleados']);
  }

  esEmpleado(){
    this.titulo = 'Editar empleado'
    if(this.id !== null){
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          numeroColaborador: data.payload.data()['numeroColaborador'],
          correo: data.payload.data()['correo'],
        })
      })
    }
  }

}
