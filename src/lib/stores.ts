import { writable } from 'svelte/store';
import { SendMessage } from './models';

export let payload = writable(new SendMessage());

export let showable = writable(false);
