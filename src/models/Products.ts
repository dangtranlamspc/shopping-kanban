export interface CategoyModel {
	_id: string;
	title: string;
	parentId: string;
	slug: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	image?: string;
	children: CategoyModel[];
	__v: number;
}

export interface ProductModel {
	_id: string;
	title: string;
	slug: string;
	description: string;
	categories: string[];
	supplier: string;
	images: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	isDeleted: boolean;
	subItems: SubProductModel[];
	price: number[];
}

export interface SubProductModel {
	size: string;
	color: string;
	price: number;
	qty: number;
	productId: string;
	images: any[];
	_id: string;
	createdAt: string;
	discount?: number;
	updatedAt: string;
	__v: number;
	imgURL?: string;
	count: number;
	createdBy: string;
}