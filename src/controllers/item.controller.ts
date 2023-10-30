import { Request, Response } from 'express';

import prisma from '../database';

/**
 * Creates a new item with the given name and category.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The created item.
 */
const createItem = async (req: Request, res: Response): Promise<void> => {
    const { name, category } = req.body;
    try {
        const item = await prisma.item.create({
            data: {
                name,
                category
            },
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Error creating item' });
    }
};

/**
 * Retrieves all items from the database.
 * @param _req - The request object.
 * @param res - The response object.
 * @returns Promise that resolves to void.
 */
const getItems = async (_req: Request, res: Response): Promise<void> => {
    try {
        const items = await prisma.item.findMany();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error getting items' });
    }
};

/**
 * Retrieves an item by its ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The item object if found, or an error message if not found or an error occurred.
 */
const getItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const item = await prisma.item.findUnique({ where: { itemId: Number(id) } });
        if (!item)
            res.status(404).json({ error: 'Item not found' });
        else
            res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Error getting item' });
    }
};

/**
 * Updates an item in the database.
 * @param req - The request object containing the item ID and updated information.
 * @param res - The response object to send the updated item or an error message.
 * @returns The updated item or an error message.
 */
const updateItem = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    const { name, category } = req.body;
    try {
        const item = await prisma.item.update({
            where: { itemId: Number(id) },
            data: {
                name,
                category
            },
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Error updating item'});
    }
};

/**
 * Deletes an item from the database.
 * @param req - The request object containing the item ID to be deleted.
 * @param res - The response object to send the result of the operation.
 * @returns A JSON response indicating whether the item was deleted successfully or not.
 */
const deleteItem = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.item.delete({ where: { itemId: Number(id) } });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item' });
    }
};

/**
 * Interface for the Item Controller, which defines the methods for handling Item-related requests.
 */
export interface ItemController {
    createItem: (req: Request, res: Response) => Promise<void>;
    getItems: (req: Request, res: Response) => Promise<void>;
    getItemById: (req: Request, res: Response) => Promise<void>;
    updateItem: (req: Request, res: Response) => Promise<void>;
    deleteItem: (req: Request, res: Response) => Promise<void>;
}

export const itemController: ItemController = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
}
