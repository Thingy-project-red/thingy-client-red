import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Temperature } from '../temperature/temperature.model';
import { Air } from '../airquality/air.model';
import { Humidity } from '../humidity/humidity.model';
import { Light } from '../light/light.model';
import { Door } from '../door/door.model';
import { Battery } from '../battery/battery.model';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/filter';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
	public temperatures: Subject<Temperature>;
	public airs: Subject<Air>;
	public humidities: Subject<Humidity>;
	public lights: Subject<Light>;
	public doors: Subject<Door>;
	public batteries: Subject<Battery>;

	private socket: WebSocketSubject<any>;

	constructor(private authService: AuthService) {
		// This is an ugly hack. Because the plain WebSocket implementation
		// doesn't let us define custom headers, we need to use an existing
		// one (subprotocol) to pass the token.
		this.socket = webSocket({
		  url: environment.ws,
		  protocol: authService.getToken()
		});

		this.temperatures = <Subject<Temperature>> this.socket
			.filter(update => update.kind === 'temperature');
		this.airs = <Subject<Air>> this.socket
			.filter(update => update.kind === 'air_quality');
		this.humidities = <Subject<Humidity>> this.socket
			.filter(update => update.kind === 'humidity');
		this.lights = <Subject<Light>> this.socket
			.filter(update => update.kind === 'light_intensity')
		this.doors = <Subject<Door>> this.socket
			.filter(update => update.kind === 'door');
		this.batteries = <Subject<Battery>> this.socket
			.filter(update => update.kind === 'battery_level');
	}
}
