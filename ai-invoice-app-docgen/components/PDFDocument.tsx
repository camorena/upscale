import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  text: { fontSize: 12, lineHeight: 1.5 },
})

export default function PDFDocument({ content }: { content: string }) {
  const lines = content.split('\n').filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {lines.map((line, idx) => (
          <View style={styles.section} key={idx}>
            <Text style={styles.text}>{line}</Text>
          </View>
        ))}
      </Page>
    </Document>
  )
}