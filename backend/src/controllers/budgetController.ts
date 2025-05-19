import { Request, Response } from 'express';
import { Budget } from '../models/Budget';

export const budgetController = {
  async create(req: Request, res: Response) {
    try {
      const budgetData = {
        ...req.body,
        createdBy: req.user?.userId,
        updatedBy: req.user?.userId
      };

      const budget = new Budget(budgetData);
      await budget.save();

      res.status(201).json(budget);
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      res.status(500).json({ message: 'Erro ao criar orçamento' });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const {
        client,
        status,
        startDate,
        endDate,
        uf,
        dasaValidation,
        bdgInclusion
      } = req.query;

      const filter: any = {};

      if (client) filter.client = new RegExp(client as string, 'i');
      if (status) filter.status = status;
      if (uf) filter.uf = uf;
      if (dasaValidation) filter.dasaValidation = dasaValidation;
      if (bdgInclusion) filter.bdgInclusion = bdgInclusion === 'true';

      if (startDate && endDate) {
        filter.requestDate = {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        };
      }

      const budgets = await Budget.find(filter)
        .sort({ createdAt: -1 })
        .populate('createdBy', 'name')
        .populate('updatedBy', 'name');

      res.json(budgets);
    } catch (error) {
      console.error('Erro ao listar orçamentos:', error);
      res.status(500).json({ message: 'Erro ao listar orçamentos' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const budget = await Budget.findById(req.params.id)
        .populate('createdBy', 'name')
        .populate('updatedBy', 'name');

      if (!budget) {
        return res.status(404).json({ message: 'Orçamento não encontrado' });
      }

      res.json(budget);
    } catch (error) {
      console.error('Erro ao buscar orçamento:', error);
      res.status(500).json({ message: 'Erro ao buscar orçamento' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const budgetData = {
        ...req.body,
        updatedBy: req.user?.userId
      };

      const budget = await Budget.findByIdAndUpdate(
        req.params.id,
        budgetData,
        { new: true }
      ).populate('createdBy', 'name')
        .populate('updatedBy', 'name');

      if (!budget) {
        return res.status(404).json({ message: 'Orçamento não encontrado' });
      }

      res.json(budget);
    } catch (error) {
      console.error('Erro ao atualizar orçamento:', error);
      res.status(500).json({ message: 'Erro ao atualizar orçamento' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const budget = await Budget.findByIdAndUpdate(
        req.params.id,
        {
          status: 'excluido',
          deletionDate: new Date(),
          updatedBy: req.user?.userId
        },
        { new: true }
      );

      if (!budget) {
        return res.status(404).json({ message: 'Orçamento não encontrado' });
      }

      res.json({ message: 'Orçamento excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      res.status(500).json({ message: 'Erro ao excluir orçamento' });
    }
  },

  async approve(req: Request, res: Response) {
    try {
      const budget = await Budget.findByIdAndUpdate(
        req.params.id,
        {
          status: 'aprovado',
          approvalDate: new Date(),
          approvedBy: req.user?.userId,
          updatedBy: req.user?.userId
        },
        { new: true }
      ).populate('createdBy', 'name')
        .populate('updatedBy', 'name');

      if (!budget) {
        return res.status(404).json({ message: 'Orçamento não encontrado' });
      }

      res.json(budget);
    } catch (error) {
      console.error('Erro ao aprovar orçamento:', error);
      res.status(500).json({ message: 'Erro ao aprovar orçamento' });
    }
  }
}; 