export interface Bucket {
	id: number;
	name: string;
	description: string;
	user_id: number;
	group_id: number;
}

export interface Goal {
	id: number;
	name: string;
	status: string;
	bucket_id: number;
}
