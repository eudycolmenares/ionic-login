import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
  ) { }

  /**
	 * Almacena informacion en el Storage
	 * @param key clave(tabla) donde se almacenara la informacion
	 * @param data informacion almacenar, puede ser numero, cadena, objeto etc
	 */
  setData(key: string, data: any) {
    this.storage.set(key, data);
  }
	/**
	 * Obtener informacion del Storage
	 * @param key clave de la informacion a consultar
	 */
  getData(key: string) {
    return this.storage.get(key);
  }
	/**
	 * Elimina tabla storage
	 */
  removeData(key: string) {
    return this.storage.remove(key);
  }
}
