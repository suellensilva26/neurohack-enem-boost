-- Adicionar premium_user ao enum app_role
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'premium_user';