"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Head from "next/head"

interface Submission {
  nome: string
  email: string
  telefone: string
  dataNascimento: string
  valorDivida: string
  valorParcela: string
  totalParcelas: string
  parcelasPagas: string
  novaParcela: number
  createdAt: string
}

export default function ResultadosPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("submissions")
    if (stored) {
      try {
        setSubmissions(JSON.parse(stored))
      } catch {
        console.error("Erro ao parsear submissões do localStorage")
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Parcelas Calculadas</title>
        <meta
          name="description"
          content="Lista de todas as submissões de clientes e cálculos"
        />
      </Head>

      <main style={styles.container}>
        <div style={styles.div}>
          <h1 style={styles.title}>Resultados</h1>

          {submissions.length === 0 ? (
            <p style={styles.noData}>Nenhuma submissão encontrada.</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Nome</th>
                    <th style={styles.th}>E-mail</th>
                    <th style={styles.th}>Telefone</th>
                    <th style={styles.th}>Data Nasc.</th>
                    <th style={styles.th}>Valor Dívida</th>
                    <th style={styles.th}>Parcela Orig.</th>
                    <th style={styles.th}>Total Parc.</th>
                    <th style={styles.th}>Parc. Pagas</th>
                    <th style={styles.th}>Nova Parc.</th>
                    <th style={styles.th}>Data Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr
                      key={i}
                      style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}
                    >
                      <td style={styles.td}>{s.nome}</td>
                      <td style={styles.td}>{s.email}</td>
                      <td style={styles.td}>{s.telefone}</td>
                      <td style={styles.td}>
                        {(() => {
                          const [year, month, day] = s.dataNascimento.split("-")
                          return `${day}/${month}/${year}`
                        })()}
                      </td>
                      <td style={styles.td}>
                        R$ {parseFloat(s.valorDivida).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        R$ {parseFloat(s.valorParcela).toFixed(2)}
                      </td>
                      <td style={styles.td}>{s.totalParcelas}</td>
                      <td style={styles.td}>{s.parcelasPagas}</td>
                      <td style={styles.td}>R$ {s.novaParcela.toFixed(2)}</td>
                      <td style={styles.td}>
                        {new Date(s.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Link href="/" style={styles.backLink}>
          ← Voltar ao formulário
        </Link>
      </main>
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    maxWidth: "100%",
    margin: "2rem auto",
    padding: "0 1rem",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#244C5A",
    marginBottom: "1rem",
    fontSize: "1.75rem",
  },
  div: {
    textAlign: "center",
    padding: "2rem",
    borderRadius: 8,
    backgroundColor: "#dcdcdc",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  noData: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
  },
  tableWrapper: {
    overflowX: "auto",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    minWidth: 1500,
  },
  thead: {
    backgroundColor: "#244C5A",
  },
  th: {
    padding: "0.75rem 1rem",
    color: "#fff",
    textAlign: "center",
    fontWeight: 600,
    borderBottom: "2px solid #ccc",
  },
  td: {
    padding: "0.75rem 1rem",
    textAlign: "center",
    borderBottom: "1px solid #eee",
    color: "#333333",
  },
  rowEven: {
    backgroundColor: "#fff",
  },
  rowOdd: {
    backgroundColor: "#f9f9f9",
  },
  backLink: {
    display: "inline-block",
    marginTop: "1rem",
    color: "#244C5A",
    textDecoration: "none",
    fontWeight: 500,
  },
}
