import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloAtraccion } from 'src/app/modelos/atraccion.modelo';
import { AtraccionService } from 'src/app/servicios/atraccion.service';

@Component({
  selector: 'app-eliminar-atraccion',
  templateUrl: './eliminar-atraccion.component.html',
  styleUrls: ['./eliminar-atraccion.component.css']
})
export class EliminarAtraccionComponent implements OnInit {

  id : String = '';

  fbvalidador : FormGroup = this.fb.group({
    'id' : ['',[Validators.required]],
    'codigo' : ['',[Validators.required]],
    'nombre' : ['',[Validators.required]],
    'imagen' : ['',[Validators.required]],
    'estatura' : ['',[Validators.required]],
    'video' : ['',[Validators.required]],
    'descripcion' : ['',[Validators.required]]
  })

  constructor(private fb:FormBuilder,
    private servicioAtraccion:AtraccionService,
    private router:Router,
    private route : ActivatedRoute){}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.ObtenerAtraccion();
    
  }

  ObtenerAtraccion(){
    this.servicioAtraccion.ObtenerAtraccionPorId(this.id).subscribe((datos : ModeloAtraccion) => {
      this.fbvalidador.controls['id'].setValue(this.id);
      this.fbvalidador.controls['codigo'].setValue(datos.codigo);      
      this.fbvalidador.controls['nombre'].setValue(datos.nombre);
      this.fbvalidador.controls['imagen'].setValue(datos.imagen);
      this.fbvalidador.controls['estatura'].setValue(datos.min_estatura);
      this.fbvalidador.controls['video'].setValue(datos.enlace_youtube);
      this.fbvalidador.controls['descripcion'].setValue(datos.descripcion);
    })
  }

  EliminarAtraccion(){
    let codigo = this.fbvalidador.controls['codigo'].value;
    let nombre = this.fbvalidador.controls['nombre'].value;
    let imagen = this.fbvalidador.controls['imagen'].value;
    let estatura = this.fbvalidador.controls['estatura'].value;
    let video = this.fbvalidador.controls['video'].value;
    let descripcion = this.fbvalidador.controls['descripcion'].value;

    let p = new ModeloAtraccion();

    p.id = this.id;
    p.codigo = codigo;
    p.nombre = nombre;
    p.imagen = imagen;
    p.min_estatura = estatura;
    p.enlace_youtube = video;
    p.descripcion = descripcion;

    this.servicioAtraccion.EliminarAtraccion(p.id).subscribe((datos: ModeloAtraccion) => {
      alert('La atracci??n fue eliminada.');
      this.router.navigate(['/administracion/buscar-atraccion']);
    },(error: any) => {
      alert('Error en la eliminaci??n de la atracci??n.');
    })



  }



}
