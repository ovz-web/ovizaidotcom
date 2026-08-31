-- =====================================================================
-- OVIZai — Migration table `leads`
-- À exécuter dans Supabase Dashboard > SQL Editor (Projet: rkangobqefhoiaslxrqc)
-- =====================================================================

-- 1. Ajout des colonnes requises sur la table public.leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS currency text,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- 2. Clé d'unicité sur l'e-mail pour la gestion des réinscriptions (code 23505)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_email_key'
  ) THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_email_key UNIQUE (email);
  END IF;
END $$;

-- 3. Sécurité RLS (Row Level Security) : Accès exclusif service_role
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow service_role full access" ON public.leads;

CREATE POLICY "Allow service_role full access"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
