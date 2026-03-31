import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LabelTemplate } from '@fareyetechnologies/label-generation-frontend';
import { BASE_PATH_APIS } from '@fareyetechnologies/label-generation-frontend/lib/esm/utils/constants';

import '@fareyetechnologies/label-generation-frontend/lib/esm/CSS/card_inner_component.css';
import '@fareyetechnologies/label-generation-frontend/lib/esm/CSS/modal_dialog.css';
import '@fareyetechnologies/label-generation-frontend/lib/esm/CSS/CustomPagination.css';
import '@fareyetechnologies/label-generation-frontend/lib/esm/CSS/CustomPagination_Party.css';
import '@fareyetechnologies/label-generation-frontend/lib/esm/CSS/NotificationStyle.css';
import './index.css';

BASE_PATH_APIS.basePathForAPIS = import.meta.env.VITE_LABEL_SERVER_URL ?? '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LabelTemplate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
