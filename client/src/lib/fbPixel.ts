/**
 * Facebook Pixel com Advanced Matching - Versão Completa
 * Integração com suporte total para Advanced Matching visível no Pixel Helper
 */

import { logger } from './logger';

declare global {
  interface Window {
    fbq: any;
    _fbq?: any;
  }
}

// Interface para dados do visitante
interface VisitorData {
  sessionId?: string;
  external_id?: string;
  ip?: string;
  userAgent?: string;
  countryCode?: string;
  regionName?: string;
  state?: string;
  city?: string;
  zip?: string;
  postalCode?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  fbp?: string;
  fbc?: string;
}

/**
 * Utilitários para cookies do Facebook
 */
const CookieUtils = {
  setCookie: (name: string, value: string, days: number = 90) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },

  getCookie: (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  // Gerar ou obter External ID
  getExternalId: (): string => {
    let externalId = CookieUtils.getCookie('external_id');
    
    if (!externalId) {
      externalId = generateUUID();
      CookieUtils.setCookie('external_id', externalId, 365);
      sessionStorage.setItem('chef_amelie_uuid_session', externalId);
    } else {
      sessionStorage.setItem('chef_amelie_uuid_session', externalId);
    }
    
    return externalId;
  },

  // Gerar ou obter Facebook Browser ID (_fbp)
  getFbp: (): string => {
    let fbp = CookieUtils.getCookie('_fbp');
    
    if (!fbp) {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 2147483647);
      fbp = `fb.1.${timestamp}.${random}`;
      CookieUtils.setCookie('_fbp', fbp, 90);
    }
    
    return fbp;
  },

  // Gerar ou obter Facebook Click ID (_fbc)
  getFbc: (): string | null => {
    let fbc = CookieUtils.getCookie('_fbc');
    
    if (!fbc) {
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get('fbclid');
      
      if (fbclid) {
        const timestamp = Date.now();
        fbc = `fb.1.${timestamp}.${fbclid}`;
        CookieUtils.setCookie('_fbc', fbc, 90);
      } else {
        return null;
      }
    }
    
    return fbc;
  }
};

/**
 * Gerar UUID v4
 */
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};


/**
 * Aguardar Facebook Pixel carregar
 */
const waitForPixel = (maxWait = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = maxWait / 100;
    let timeoutId: NodeJS.Timeout | null = null;
    let resolved = false;

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const checkPixel = () => {
      if (resolved) {
        cleanup();
        return;
      }

      attempts++;
      
      if (typeof window !== 'undefined' && window.fbq && typeof window.fbq === 'function') {
        resolved = true;
        cleanup();
        resolve(true);
        return;
      }
      
      if (attempts >= maxAttempts) {
        resolved = true;
        cleanup();
        resolve(false);
        return;
      }
      
      timeoutId = setTimeout(checkPixel, 100);
    };
    
    checkPixel();
  });
};

/**
 * Hash SHA256 para dados do Advanced Matching
 */
const hashData = async (data: string): Promise<string> => {
  if (!data) return '';

  const normalized = data.toLowerCase().trim();

  // Usar Web Crypto API se disponível
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(normalized);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.warn('⚠️ Erro ao usar crypto.subtle, usando fallback:', error);
    }
  }

  // Fallback: retornar sem hash (Facebook pode aceitar dados não hasheados)
  return normalized;
};

/**
 * Preparar dados de Advanced Matching para o Facebook Pixel
 */
const prepareAdvancedMatchingData = async (visitorData: VisitorData): Promise<any> => {
  const advancedMatching: any = {};

  // External ID (não hasheado)
  if (visitorData.external_id || visitorData.sessionId) {
    advancedMatching.external_id = visitorData.external_id || visitorData.sessionId;
  }

  // Email (hasheado)
  if (visitorData.email) {
    advancedMatching.em = await hashData(visitorData.email);
  }

  // Telefone (hasheado, apenas números)
  if (visitorData.phone) {
    const phoneNumbers = visitorData.phone.replace(/\D/g, '');
    advancedMatching.ph = await hashData(phoneNumbers);
  }

  // Nome (hasheado)
  if (visitorData.firstName) {
    advancedMatching.fn = await hashData(visitorData.firstName);
  }

  // Sobrenome (hasheado)
  if (visitorData.lastName) {
    advancedMatching.ln = await hashData(visitorData.lastName);
  }

  // Gênero (hasheado: 'm' ou 'f')
  if (visitorData.gender) {
    advancedMatching.ge = await hashData(visitorData.gender.substring(0, 1));
  }

  // Data de nascimento (hasheado: formato YYYYMMDD)
  if (visitorData.dateOfBirth) {
    advancedMatching.db = await hashData(visitorData.dateOfBirth.replace(/\D/g, ''));
  }

  // Cidade (hasheado)
  if (visitorData.city) {
    advancedMatching.ct = await hashData(visitorData.city);
  }

  // Estado/Região (hasheado, código de 2 letras)
  if (visitorData.state || visitorData.regionName) {
    const state = visitorData.state || visitorData.regionName || '';
    advancedMatching.st = await hashData(state);
  }

  // CEP/Código Postal (hasheado, apenas números)
  if (visitorData.zip || visitorData.postalCode) {
    const zip = (visitorData.zip || visitorData.postalCode || '').replace(/\D/g, '');
    advancedMatching.zp = await hashData(zip);
  }

  // País (hasheado, código de 2 letras)
  if (visitorData.countryCode) {
    advancedMatching.country = await hashData(visitorData.countryCode.toLowerCase());
  }

  // Facebook Browser ID (não hasheado)
  if (visitorData.fbp) {
    advancedMatching.fbp = visitorData.fbp;
  }

  // Facebook Click ID (não hasheado)
  if (visitorData.fbc) {
    advancedMatching.fbc = visitorData.fbc;
  }

  return advancedMatching;
};

/**
 * Enviar evento para o servidor (CAPI) - versão simplificada
 */
const sendToServer = async (eventType: string, eventId: string, customParams: any, visitorData: VisitorData) => {
  try {
    const eventData = {
      eventType,
      eventId,
      sessionId: CookieUtils.getExternalId(),
      customParameters: customParams,
      timestamp: new Date().toISOString()
    };

    await fetch('/api/database/facebook-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });

    logger.log(`✅ Evento ${eventType} salvo no servidor`);
  } catch (error) {
    logger.warn(`⚠️ Erro ao salvar ${eventType} no servidor:`, error);
  }
};

export const FacebookPixel = {
  CookieUtils,

  /**
   * Inicializar pixel (sem enviar PageView adicional)
   */
  init: async (visitorData: VisitorData) => {
    if ((window as any).chefAmeliePixelInitialized) {
      logger.log('🎯 Pixel já inicializado');
      return true;
    }

    logger.log('🎯 Inicializando Facebook Pixel...');

    const pixelReady = await waitForPixel();
    if (!pixelReady) {
      logger.error('❌ Facebook Pixel não carregou no tempo esperado');
      return false;
    }

    try {
      // Salvar dados do visitante para uso posterior
      (window as any).chefAmelieVisitorData = visitorData;
      (window as any).chefAmeliePixelInitialized = true;

      logger.log('✅ Pixel inicializado (PageView já enviado pelo HTML)');
      return true;

    } catch (error) {
      logger.error('❌ Erro ao inicializar pixel:', error);
      return false;
    }
  },

  /**
   * Inicializar pixel COM Advanced Matching visível no Pixel Helper
   */
  initWithAdvancedMatching: async (visitorData: VisitorData) => {
    if ((window as any).chefAmeliePixelInitialized) {
      logger.log('🎯 Pixel já inicializado');
      return true;
    }

    logger.log('🎯 Inicializando Facebook Pixel COM Advanced Matching...');

    const pixelReady = await waitForPixel();
    if (!pixelReady) {
      logger.error('❌ Facebook Pixel não carregou no tempo esperado');
      return false;
    }

    try {
      // Preparar dados de Advanced Matching
      const advancedMatchingData = await prepareAdvancedMatchingData(visitorData);

      logger.log('📊 Advanced Matching Data preparado:', {
        fields: Object.keys(advancedMatchingData),
        external_id: advancedMatchingData.external_id,
        fbp: advancedMatchingData.fbp,
        fbc: advancedMatchingData.fbc,
        hasCity: !!advancedMatchingData.ct,
        hasState: !!advancedMatchingData.st,
        hasCountry: !!advancedMatchingData.country,
        hasZip: !!advancedMatchingData.zp
      });

      // Atualizar o Pixel com Advanced Matching usando fbq('init') novamente
      // Isso torna o Advanced Matching visível no Facebook Pixel Helper
      if (window.fbq) {
        const pixelId = '1053618620169381'; // Seu Pixel ID

        logger.log('🔥 Aplicando Advanced Matching ao Pixel...');

        // Reinicializar o pixel COM Advanced Matching
        window.fbq('init', pixelId, advancedMatchingData);

        logger.log('✅ Advanced Matching aplicado! Visível no Pixel Helper');
      }

      // Salvar dados do visitante e Advanced Matching globalmente
      (window as any).chefAmelieVisitorData = visitorData;
      (window as any).chefAmelieAdvancedMatching = advancedMatchingData;
      (window as any).chefAmeliePixelInitialized = true;

      // Log para debug
      logger.log('📱 Advanced Matching ativado com sucesso!', {
        totalFields: Object.keys(advancedMatchingData).length,
        fields: Object.keys(advancedMatchingData),
        visibleInPixelHelper: true
      });

      return true;

    } catch (error) {
      logger.error('❌ Erro ao inicializar pixel com Advanced Matching:', error);
      return false;
    }
  },

  /**
   * InitiateCheckout (não usado mais - enviado pelo HTML)
   */
  trackInitiateCheckout: async (visitorData?: VisitorData) => {
    logger.log('🎯 InitiateCheckout já foi enviado pelo HTML no carregamento da página');
    return;
  },

  /**
   * Obter status simples
   */
  getStatus: () => {
    return {
      pixelLoaded: typeof window !== 'undefined' && !!window.fbq,
      initialized: !!(window as any).chefAmeliePixelInitialized,
      checkoutSent: !!(window as any).chefAmelieCheckoutSent,
      advancedMatchingActive: !!(window as any).chefAmelieAdvancedMatching,
      advancedMatchingFields: (window as any).chefAmelieAdvancedMatching ?
        Object.keys((window as any).chefAmelieAdvancedMatching) : []
    };
  },

  /**
   * Obter status detalhado do Advanced Matching (para debug UI)
   */
  getAdvancedMatchingStatus: () => {
    const advancedMatching = (window as any).chefAmelieAdvancedMatching;
    const isActive = !!advancedMatching && Object.keys(advancedMatching).length > 0;

    return {
      pixelLoaded: typeof window !== 'undefined' && !!window.fbq,
      advancedMatchingActive: isActive,
      fieldsCount: advancedMatching ? Object.keys(advancedMatching).length : 0,
      fields: advancedMatching ? Object.keys(advancedMatching) : [],
      data: advancedMatching || null
    };
  },

  /**
   * Reset flags (para debug)
   */
  reset: () => {
    (window as any).chefAmeliePixelInitialized = false;
    (window as any).chefAmelieCheckoutSent = false;
    (window as any).chefAmelieAdvancedMatching = null;
    logger.log('🔄 Flags resetados');
  },


};