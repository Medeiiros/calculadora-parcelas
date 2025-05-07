"use client"

import React, { useState, ChangeEvent, FormEvent } from "react"
import Head from "next/head"
import Link from "next/link"

interface FormData {
  nome: string
  email: string
  telefone: string
  dataNascimento: string
  valorDivida: string
  valorParcela: string
  totalParcelas: string
  parcelasPagas: string
}

interface Submission extends FormData {
  novaParcela: number
  createdAt: string
}

export default function Page() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    valorDivida: "",
    valorParcela: "",
    totalParcelas: "",
    parcelasPagas: "",
  })

  const [errors, setErrors] = useState<{ email?: string; telefone?: string }>(
    {}
  )
  const [novaParcela, setNovaParcela] = useState<number | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  // Carrega submissões do localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("submissions")
    if (stored) {
      try {
        setSubmissions(JSON.parse(stored))
      } catch {
        localStorage.removeItem("submissions")
      }
    }
  }, [])

  const saveSubmission = (sub: Submission) => {
    const updated = [...submissions, sub]
    setSubmissions(updated)
    localStorage.setItem("submissions", JSON.stringify(updated))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // Máscara simples de telefone
  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11)
    let formatted = ""
    if (digits.length > 0) formatted += "(" + digits.slice(0, 2)
    if (digits.length >= 2) formatted += ") "
    if (digits.length >= 3) formatted += digits.slice(2, 7)
    if (digits.length >= 7) formatted += "-" + digits.slice(7)
    setForm((prev) => ({ ...prev, telefone: formatted }))
    setErrors((prev) => ({ ...prev, telefone: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: typeof errors = {}
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    if (!emailPattern.test(form.email)) {
      newErrors.email = "Digite um e-mail válido"
    }
    if (form.telefone.replace(/\D/g, "").length !== 11) {
      newErrors.telefone = "Telefone incompleto"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    const valorParcelaNum = parseFloat(form.valorParcela.replace(",", ".")) || 0
    const result = valorParcelaNum / 2 + 7.5
    setNovaParcela(result)

    const newSub: Submission = {
      ...form,
      novaParcela: result,
      createdAt: new Date().toISOString(),
    }
    saveSubmission(newSub)
  }

  return (
    <>
      <Head>
        <title>Cadastro & Calculadora de Parcelas</title>
        <meta
          name="description"
          content="Formulário com persistência em localStorage"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          {/* Campos pessoais */}
          <div style={styles.div}>
            <h1 style={styles.title}>Cadastro de Cliente</h1>
            <div style={styles.field}>
              <label htmlFor="nome" style={styles.label}>
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="João da Silva"
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="exemplo@provedor.com"
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            <div style={styles.field}>
              <label htmlFor="telefone" style={styles.label}>
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleTelefoneChange}
                required
                style={styles.input}
                placeholder="(DD) 91234-5678"
              />
              {errors.telefone && (
                <span style={styles.error}>{errors.telefone}</span>
              )}
            </div>

            <div style={styles.field}>
              <label htmlFor="dataNascimento" style={styles.label}>
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                value={form.dataNascimento}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <hr style={styles.separator} />

          {/* Campos da calculadora */}
          <div style={styles.div}>
            <h1 style={styles.title}>Calculadora de Parcelas</h1>
            <div style={styles.field}>
              <label htmlFor="valorDivida" style={styles.label}>
                Valor total da dívida
              </label>
              <input
                type="number"
                id="valorDivida"
                name="valorDivida"
                value={form.valorDivida}
                onChange={handleChange}
                required
                step="0.01"
                style={styles.input}
                placeholder="ex: 1200.00"
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="valorParcela" style={styles.label}>
                Valor da parcela da dívida
              </label>
              <input
                type="number"
                id="valorParcela"
                name="valorParcela"
                value={form.valorParcela}
                onChange={handleChange}
                required
                step="0.01"
                style={styles.input}
                placeholder="ex: 150.00"
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="totalParcelas" style={styles.label}>
                Número total de parcelas
              </label>
              <input
                type="number"
                id="totalParcelas"
                name="totalParcelas"
                value={form.totalParcelas}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="ex: 12"
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="parcelasPagas" style={styles.label}>
                Número de parcelas pagas
              </label>
              <input
                type="number"
                id="parcelasPagas"
                name="parcelasPagas"
                value={form.parcelasPagas}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="ex: 4"
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Salvar Submissão
          </button>
        </form>

        {/* Exibe valor calculado */}
        {novaParcela !== null && (
          <div style={styles.result}>
            <h2>Nova Parcela:</h2>
            <p>R$ {novaParcela.toFixed(2)}</p>
          </div>
        )}

        {/* Total de registros */}
        <p style={{ marginTop: "1rem" }}>
          Total de submissões salvas: {submissions.length}
        </p>

        {/* Botão para ver resultados */}
        <Link href="/resultados">
          <button style={styles.viewButton}>Ver Resultados</button>
        </Link>
      </main>
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 600,
    margin: "1rem auto",
    padding: "1rem 2rem",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#244C5A",
    padding: 8,
    marginBottom: "1rem",
    fontSize: "2rem",
  },
  div: {
    textAlign: "center",
    padding: "2rem",
    borderRadius: 8,
    backgroundColor: "#dcdcdc",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#244C5A",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginTop: "2rem",
  },
  viewButton: {
    marginTop: "1rem",
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#5db1d5",
    color: "#244C5A",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  separator: {
    margin: "2rem 0",
    border: "none",
    borderTop: "1px solid #eee",
  },
  result: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    textAlign: "center",
  },
  error: {
    color: "#E74C3C",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
    display: "block",
  },
}
