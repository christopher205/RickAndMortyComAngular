import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodioDetalheComponent } from './episodio-detalhe.component';

describe('EpisodioDetalheComponent', () => {
  let component: EpisodioDetalheComponent;
  let fixture: ComponentFixture<EpisodioDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodioDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpisodioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
