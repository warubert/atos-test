import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPopoutComponent } from './edit-popout.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditPopoutComponent', () => {
  let component: EditPopoutComponent;
  let fixture: ComponentFixture<EditPopoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPopoutComponent],
      providers: [
        DynamicDialogRef,
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              value: 10,
              desc: 'teste',
              type: 'Entrada',
              date: new Date(),
              id: 1,
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPopoutComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with input values', () => {
    const fixture = TestBed.createComponent(EditPopoutComponent);
    const component = fixture.componentInstance;
    component.value = 10;
    component.desc = 'teste';
    component.type = 'Entrada';
    component.date = new Date();
    component.id = '1';
    fixture.detectChanges();

    expect(component.value).toEqual(10);
    expect(component.desc).toEqual('teste');
    expect(component.type).toEqual('Entrada');
    expect(component.date).toEqual(jasmine.any(Date));
    expect(component.id).toEqual('1');
  });

  it('should call save method and close the dialog', async () => {
    const fixture = TestBed.createComponent(EditPopoutComponent);
    const component = fixture.componentInstance;
    spyOn(component.ref, 'close');
    await component.save();

    expect(component.ref.close).toHaveBeenCalled();
  });

  it('should check if save button is enabled when all inputs are filled', () => {
    const fixture = TestBed.createComponent(EditPopoutComponent);
    const component = fixture.componentInstance;
    component.value = 10;
    component.desc = 'teste';
    component.type = 'Entrada';
    component.date = new Date();
    component.id = '1';
    fixture.detectChanges();

    expect(component.checkSave()).toBe(false);
  });

  it('should check if save button is disabled when any input is empty', () => {
    const fixture = TestBed.createComponent(EditPopoutComponent);
    const component = fixture.componentInstance;
    component.value = 10;
    component.desc = '';
    component.type = 'Entrada';
    component.date = new Date();
    component.id = '1';
    fixture.detectChanges();

    expect(component.checkSave()).toBe(true);
  });
});
