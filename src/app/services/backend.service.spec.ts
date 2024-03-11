import { TestBed } from '@angular/core/testing';
import { BackendService } from './backend.service';
import { of } from 'rxjs';

describe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data successfully', async () => {
    const mockData = {
      id: '1',
      desc: 'Descrição da saida 1',
      value: 15000,
      date: '2024-01-10T20:07:24.148Z',
      type: 'Saída',
    };
    spyOn(service, 'getData').and.returnValue(of(mockData).toPromise());

    const data = await service.getData();

    expect(data).toEqual(mockData);
  });

  it('should save data successfully', async () => {
    const mockData = {
      desc: 'Descrição da saida 1',
      value: 15000,
      date: '2024-01-10T20:07:24.148Z',
      type: 'Saída',
    };
    spyOn(service, 'saveData').and.returnValue(of(mockData) as any);
    const result = await service.saveData(mockData);
    expect(result).toBeTruthy();
  });

  it('should delete data successfully', async () => {
    const id = '1';
    const deleteSpy = spyOn(service, 'delete').and.returnValue(
      Promise.resolve()
    );
    const result = await service.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('should update data successfully', async () => {
    const mockData = {
      id: '1',
      desc: 'Descrição da saida 1',
      value: 1000,
      date: '2024-01-10T20:07:24.148Z',
      type: 'Saída',
    };
    spyOn(service, 'update').and.returnValue(of(mockData) as any);
    await service.update(mockData);
    expect(service.update).toHaveBeenCalled();
  });
});
