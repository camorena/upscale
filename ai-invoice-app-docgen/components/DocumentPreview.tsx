'use client'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './PDFDocument'

export default function DocumentPreview({ content }: { content: string }) {
  return (
    <div className="mt-8 bg-white p-6 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Preview</h3>
      <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">{content}</pre>
      <PDFDownloadLink
        document={<PDFDocument content={content} />}
        fileName="business-document.pdf"
        className="btn btn-success"
      >
        {({ loading }) => loading ? 'Preparing PDF...' : 'Download PDF'}
      </PDFDownloadLink>
    </div>
  )
}