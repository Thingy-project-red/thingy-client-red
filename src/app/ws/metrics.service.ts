import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/filter';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Temperature } from '../temperature/temperature.model';
import { Air } from '../airquality/air.model';
import { Humidity } from '../humidity/humidity.model';
import { Light } from '../light/light.model';
import { Door } from '../door/door.model';
import { Battery } from '../battery/battery.model';

@Injectable({ providedIn: 'root' })
export class MetricsService {
	public temperatures: Subject<Temperature>;
	public airs: Subject<Air>;
	public humidities: Subject<Humidity>;
	public lights: Subject<Light>;
	public doors: Subject<Door>;
	public batteries: Subject<Battery>;

	private socket: WebSocketSubject<any>;

	constructor() {
		this.socket = webSocket(environment.ws);

		this.temperatures = <Subject<any>> this.socket
			.filter(update => update.kind === 'temperature');
		this.airs = <Subject<any>> this.socket
			.filter(update => update.kind === 'air_quality');
		this.humidities = <Subject<any>> this.socket
			.filter(update => update.kind === 'humidity');
		this.lights = <Subject<any>> this.socket
			.filter(update => update.kind === 'light_intensity')
		this.doors = <Subject<any>> this.socket
			.filter(update => update.kind === 'door');
		this.batteries = <Subject<any>> this.socket
			.filter(update => update.kind === 'battery_level');
	}
}
