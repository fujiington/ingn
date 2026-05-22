export default function Footer() {
  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid #e0dcdc',
      marginTop: 64,
      padding: '40px 16px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 32,
      }}>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: '#555' }}>Adresse:</h4>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#333' }}>
            Intet nyt - Godt nyt ApS<br />
            Tulipanvej 232<br />
            7320<br />
            Valby Øster
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: '#555' }}>Links</h4>
          {['vikanweb.dk', 'overpådenandenside.dk', 'retsinformation.dk', 'nogetmednews.dk'].map(link => (
            <p key={link} style={{ fontSize: 13, lineHeight: 2, color: '#333' }}>{link}</p>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: '#555' }}>Politik</h4>
          {['Privatlivspolitik', 'Cookiepolitik', 'Købsinformation', 'Delingspolitik'].map(p => (
            <p key={p} style={{ fontSize: 13, lineHeight: 2, color: '#333' }}>{p}</p>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: '#555' }}>Kontakt</h4>
          <p style={{ fontSize: 13, lineHeight: 2, color: '#333' }}>
            ingn@nyhed.dk<br />
            telefon: 23232323<br />
            fax: 123123-333
          </p>
        </div>
      </div>
    </footer>
  );
}
