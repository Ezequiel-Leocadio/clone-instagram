import React from 'react';
    
export default function menu() {
    
  return (    
    <div className="pagination justify-content-center">
    <span className="step-links">
     
            <a href="&page=1" className="btn btn-default">&laquo; Primeira</a>
            <a href="&page=" className="btn btn-default">Anterior</a>
   

        <span className="current">
            Página de 
        </span>

     
            <a href="&page=" className="btn btn-default">Próxima</a>
            <a href="&page=" className="btn btn-default">Ultima &raquo;</a>
    
    </span>
</div>

  
  );
}
