export class ApiMessage {
	id: number | undefined;
	name: string;
	func: string;
	hdr: string;
	edition0: string;
	sendto0: string;
	send_p0: string[];
	received0: string;
	received_p0: string[];
	comment0: string;
	edition1: string;
	sendto1: string;
	send_p1: string[];
	received1: string;
	received_p1: string[];
	comment1: string;
	scenario: string;
	scenario_no: number;
	// raw_txt0: string;
	// raw_txt1: string;

	constructor() {
		(this.id = undefined),
			(this.name = ''),
			(this.func = ''),
			(this.hdr = ''),
			(this.edition0 = ''),
			(this.sendto0 = ''),
			(this.send_p0 = []);
		(this.received0 = ''),
			(this.received_p0 = []),
			(this.comment0 = 'Ok'),
			(this.edition1 = ''),
			(this.sendto1 = ''),
			(this.send_p1 = []);
		(this.received1 = ''), (this.received_p1 = []);
		this.comment1 = 'Ok';
		this.scenario = '';
		this.scenario_no = -1;
		// this.raw_txt0 = '';
		// this.raw_txt1 = '';
	}

	set_hdr(input: string) {
		let message = input.split(',')[0];
		let regex = /HDR=([^ ]*)/;
		let match = message.match(regex);
		if (match) {
			let value = match[1];
			this.hdr = value;
		}
	}
}

export class SendMessage {
	id: number;
	job: string;
	edition: string;
	invoke: string;
	sendto: string;
	received: string;
	send_parms: string[];
	received_params: string[];
	comment: string;

	constructor() {
		(this.id = -1),
			(this.job = ''),
			(this.edition = ''),
			(this.invoke = ''),
			(this.sendto = ''),
			(this.received = ''),
			(this.send_parms = []),
			(this.received_params = []),
			(this.comment = '');
	}
	set_function(funcname: string) {
		this.job = funcname;
	}
	set_edition(data: string) {
		const datetime = new Date();
		// console.log(datetime.getFullYear().toString());
		return data.includes(`${datetime.getFullYear().toString()}-`) ? 'win10' : 'Xp';
	}
	into_formated() {
		this.sendto = formate(this.sendto);
		this.invoke = ExtractInterfaceFrom(this.sendto);
		this.send_parms = extract(this.sendto);
		this.received = formate(this.received);
		this.received_params = extract(this.received);
		// markedDiff(this);
	}
	try_from(funcname: string, data: string) {
		this.job = funcname;
		this.edition = this.set_edition(data);
		this.invoke = ExtractInterfaceFrom(data);
		const messages = data.split('+');

		this.sendto = messages[0];
		this.received = messages[1];
		this.send_parms = extract(this.sendto);
		this.received_params = extract(this.received);
	}
}

export class LogData {
	raw: any;
	regex: RegExp;
	data: string[];
	constructor(raw: string) {
		this.raw = raw;
		this.regex = /(SendMessage|ReceiveMsg|Send Data|Received Data)/;
		this.data = [];
	}
	processLog() {
		let newStr = optimizeLineBreakerAndWhiteSpace(this.raw);
		const datePattern = getDatePattern(newStr.trim());
		let formated = formateStr(newStr, datePattern);
		this.data = processLogs(formated, this.regex);
	}
}

const processLogs = (logs: string, regex: RegExp) => {
	const result = [];
	const lines = logs.split('\n');
	// console.log('>>\n',lines)
	for (let line of lines) {
		if (regex.test(line)) {
			result.push(line);
		}
	}
	// console.log('>>\n',result)
	const line_groups = [];
	for (let i = 0; i < result.length; i++) {
		if (result[i].includes('[SendMessage]') || result[i].includes('[Send Data]')) {
			let sendMessage = result[i];
			let receiveMsg = '';
			for (let j = i + 1; j < result.length; j++) {
				if (result[j].includes('[ReceiveMsg]') || result[j].includes('[Received Data]')) {
					receiveMsg = result[j];
					if (result.length > j + 1 && result[j + 1].includes('[Received Data]')) {
						receiveMsg += result[j + 1].slice(31);
					}
					break;
				}
				break;
			}
			line_groups.push(sendMessage + '+' + receiveMsg);
		}
	}
	// console.log(line_groups);
	return line_groups;
};

const formateStr = (inputStr: string, pattr: string) => {
	const arr = inputStr.split(pattr);
	const result = arr.map((line) => {
		const time = line.slice(0, 26);
		const msg = line.slice(26);
		return `${pattr} ${time}${msg}`;
	});
	return result.join('\n');
};

const getDatePattern = (new_str: string) => {
	const date = new Date();
	let datePattern = '';
	if (new_str.includes(`[${date.getFullYear()}`)) {
		datePattern = `${new_str.slice(0, 11)}`;
	} else {
		datePattern = `${new_str.slice(0, 5)}`;
	}
	return datePattern;
};

const optimizeLineBreakerAndWhiteSpace = (str: string) => {
	let strr = str.trim();
	// 先进行换行符替换,全部替换为单个空格
	let new_str = strr.replace(/\n\s{15}/g, '');
	// 替换剩余换行符
	new_str = new_str.replace(/\n/g, ' ');
	return new_str;
};

const formate = (str: string) => {
	if (str === '') {
		return '';
	}
	str = str.trim();
	// 先进行换行符替换,全部替换为单个空格
	let new_str = str.replace(/\n\s*/g, ' +++++ ');
	// 替换剩余换行符
	// new_str = new_str.replace(/\n/g, ' ');
	// console.log(new_str);
	return new_str;
};

export const extract = (inputStr: string) => {
	if (inputStr === '') {
		return [];
	}

	const params = [];
	const interface_name = ExtractInterfaceFrom(inputStr);
	params.push(interface_name);

	if (inputStr.includes('JOBDATA=')) {
		// console.log('have job data');
		let [jobdata, left_string] = extractJobDataFrom(inputStr);
		// console.log(left_string);

		parseParamsByRegex(left_string, params);
		// push jobdata to the bottom of params list
		params.push(`JOBDATA=${jobdata}`);
	} else {
		parseParamsByRegex(inputStr, params);
	}

	// console.log(params);
	return params;
};

const parseParamsByRegex = (inputStr: string, params: string[]) => {
	// 提取等号右边存在双引号的内容，你可以使用这个正则表达式：(\w+)=((?:"[^"]*"|[^ ])+)。
	// 这个正则表达式会匹配一个或多个字母数字字符（\w+），后面跟着一个等号（=），
	// 然后是一个或多个非空格字符（[^ ]+）或者一个被双引号包围的字符串（"[^"]*"）
	// const regex = /(\w+)=((?:"[^"]*"|[^ ])+)/g;

	// let match;
	// while ((match = regex.exec(inputStr)) !== null) {
	// 	console.log(match)
	// 	console.log(`${match[1]}=${match[2]}`);
	// 	params.push(`${match[1]}=${match[2]}`);
	// }

	// 匹配一个或多个非空格字符，后面紧跟一个等号，再后面是一个由一对双引号包裹的字符串（其中可以包含任意字符或符号）或零个或多个非空格字符。这些字符必须被空格包围
	// const regex = /(?<=\s)[^=\s]+=(?:"(?:[^"\\]|\\.)*"|[^=\s]*)(?=\s)/g;
	const regex = /[^=\s]+=(?:"(?:[^"\\]|\\.)*"|[^=\s]*)(?=\s)/g;
	// const regex = /(\w+)=((?:"[^"]*"|\w*/g;
	const matches = inputStr.match(regex);
	matches?.forEach((item) => {
		params.push(item);
	});
};

export const ExtractInterfaceFrom = (inputStr: string) => {
	if (inputStr === '') {
		return '';
	}
	let interface_name = '';

	let pattern =
		/\[((Send Data)|(SendMessage)|(Received Data)|(ReceiveMsg))\](:?\s?)(\d+)?(\w+)(\s)/;
	let match_results = pattern.exec(inputStr);
	// console.log('pattern result: ', match_results);
	if (match_results !== null) {
		interface_name = match_results[8];
		// console.log('pattern matched: ', interface_name); // GETLOTINFO
		return interface_name;
	}
	return '';
};

const extractJobDataFrom = (inputStr: string): [string, string] => {
	const no_data: [string, string] = ['', ''];

	try {
		const JOBDATA = 'JOBDATA';
		if (inputStr === '') {
			return no_data;
		}
		const indexOfJobData = inputStr.indexOf(JOBDATA);
		const left_string = inputStr.substring(0, indexOfJobData);
		let pattern = /".*"/g;

		const match_results = pattern.exec(inputStr);
		const jobdata = match_results ? match_results[0] : '';
		if (jobdata !== null) {
			return [jobdata, left_string];
		}
		return no_data;
		// console.log('matched result: ',match_results[0]);
	} catch (error) {
		alert('extract job data occurs error');
		return no_data;
	}
};

export declare type Event = any;
