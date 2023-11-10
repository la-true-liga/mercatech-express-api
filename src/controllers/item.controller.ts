import { item_category } from '@prisma/client';
import { Request, Response } from 'express';

import prisma from '../database';
import { Item, ItemController } from '../interfaces/item.interfaces';

/**
 * Creates a new item with the given name and category.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The created item.
 */
const createItem = async (req: Request, res: Response): Promise<void> => {
    const { name, category } : {name: string, category: item_category} = req.body;
    
    try {
        if (name === undefined || category === undefined)
        {
            res.status(400).json({ error: 'Missing name or category' });
            return;
        }
        const item: Item = await prisma.item.create({
            data: {
                name: name,
                category: category
            },
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Error creating item' });
    }
};

/**
 * Retrieves all items from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns Promise that resolves to void.
 */
const getItems = async (req: Request, res: Response): Promise<void> => {
    const { page } = req.params;
    const {name, category} = req.query;
    
    const elements: number = 10;
    
    try {
        let items: Item[] = [];

        if (name === undefined && category === undefined)
            items = await prisma.item.findMany({
                skip: elements * (Number(page) || 0),
                take: elements,
                orderBy: {name: 'asc'}
            });
        else if (name !== undefined && category !== undefined)
            items = await prisma.item.findMany({
                skip: elements * (Number(page) || 0),
                take: elements,
                where: { name: String(name), category: item_category[category as keyof typeof item_category] },
                orderBy: {name: 'asc'}
            });
        else if (category !== undefined
                    && Object.values(item_category).includes(item_category[category as keyof typeof item_category]))
            items = await prisma.item.findMany({
                skip: elements * (Number(page) || 0),
                take: elements,
                where: { category: item_category[category as keyof typeof item_category] },
                orderBy: {name: 'asc'}
            });
        else
            items = await prisma.item.findMany({
                skip: elements * (Number(page) || 0),
                take: elements,
                where: { name: String(name) },
                orderBy: {name: 'asc'}
            });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error getting items' });
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
    const { name, category } : {name: string, category: item_category} = req.body;

    try {

        if (id == undefined)
        {
            res.status(400).json({ error: 'Missing item ID' });
            return;
        }
        if (name === undefined && category === undefined)
        {
            res.status(400).json({ error: 'Data not found' });
            return;
        }

        const item: Item = await prisma.item.update({
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
        if (id === undefined)
        {
            res.status(400).json({ error: 'Missing item ID' });
            return;
        }
        await prisma.item.delete({ where: { itemId: Number(id) } });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item' });
    }
};

export const itemController: ItemController = {
    createItem,
    getItems,
    updateItem,
    deleteItem
}
