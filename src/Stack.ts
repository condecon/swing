import _ from "lodash";
import Sister from "sister";
import rebound from "rebound";
import Card from "./Card.js";


export default class Stack{
	public eventEmitter;
	public index: {
        card:unknown,
        element:HTMLElement
    }[];
	public springSystem;
	public config:object  | undefined;

	public constructor(config?:object){

		this.springSystem = new rebound.SpringSystem();
		this.eventEmitter = Sister();
		this.index = new Array<{card:unknown, element:HTMLElement}>();
		this.config = config;
	}


	/**
     * Get the configuration object.
     */
	public getConfig(){
		return this.config;
	}

	/**
   * Get a singleton instance of the SpringSystem physics engine.
   *
   * 
   */
	public getSpringSystem() {
		return this.springSystem;
	}

	/**
     * Proxy to the instance of the event emitter.
     * @param eventName 
     * @param listener 
     */
	public on(eventName:string, listener:string){
		this.eventEmitter.on(eventName, listener);
   
	}


	/**
     * Creates an instance of Card
     * and associates it with an an element.
     * @param element 
     * @param prepend 
     * @returns 
     */
	public createCard(element:HTMLElement, prepend:boolean):object{
		//Any will be removed later.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const card = Card(this, element, prepend) as any;
		const events = [
			"throwout",
			"throwoutend",
			"throwoutleft",
			"throwoutright",
			"throwoutup",
			"throwoutdown",
			"throwin",
			"throwinend",
			"dragstart",
			"dragmove",
			"dragend",
		];

		// Proxy Card events to the Stack.
		events.forEach((eventName) => {
			card.on(eventName, (data: unknown) => {
				this.eventEmitter.trigger(eventName, data);
			});
		});

		this.index.push({
			card,
			element,
		});

		return card;
	}


	/**
     * Returns an instance of Card associated with an element.
     * @param element 
     * @returns 
     */
	public getCard(element:HTMLElement):unknown|null{
		const group = _.find(this.index, {
			element,
		});

		if (group) {
			return group.card;
		}

		return null;
	}


	/**
     * Removes an instance of Card from the stack index.
     * @param card 
     * @returns 
     */
	public destroyCard(card:unknown){
		this.eventEmitter.trigger("destroyCard", card);

		return _.filter(this.index, (indexCard) => {
			return indexCard !== card;
		});
	}
}
