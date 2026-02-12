# Check files
ls -la src/crm/pages/

# Create with full code
cat > src/crm/pages/BulkUpload.jsx << 'EOF'
import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

const BulkUpload
