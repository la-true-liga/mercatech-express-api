import { $Enums } from '@prisma/client';
import { Request, Response } from 'express';

/**
 * Interface that represents an item
 */
export interface Item {
    itemId: number;
    name: string;
    category: $Enums.item_category; 
}

/**
 * Interface for the Item Controller, which defines the methods for handling Item-related requests.
 */
export interface ItemController {
    createItem: (req: Request, res: Response) => Promise<void>;
    getItems: (req: Request, res: Response) => Promise<void>;
    updateItem: (req: Request, res: Response) => Promise<void>;
    deleteItem: (req: Request, res: Response) => Promise<void>;
}