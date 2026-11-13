# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 12:10:06. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13544 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
285: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
290: <!-- Aviso: nova versão do app Android -->
293: <!-- Aviso vermelho: notificações desligadas -->
296: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
300: <!-- Aviso de Pix / pagamento pendente -->
303: <!-- Navegação de Abas -->
321: <!-- Conteúdo das Abas Motorista -->
324: <!-- Aba CRLV-e -->
325: #tabDrvCrlv
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Contrato -->
335: #tabDrvContract
345: <!-- Renderizado dinamicamente -->
349: <!-- Aba Vistoria -->
350: #tabDrvInspection
357: <!-- Aba Pagamento -->
358: #tabDrvPayment
371: <!-- Caução e multas do motorista -->
373: <!-- Valor e descrição da cobrança -->
383: <!-- Seção Pix -->
397: <!-- QR Code Renderizado aqui -->
430: <!-- Seção Upload de Comprovante -->
447: <!-- Lista de comprovantes -->
452: <!-- Recibos quando o contrato está encerrado -->
459: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
460: #secMasterPanel
500: <!-- Aviso: falta criar a tabela dos termos no banco -->
503: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
505: <!-- Lista de Veículos -->
521: <!-- Renderizado via JS -->
528: <!-- Form de Adicionar Veículo -->
575: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
675: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
681: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
686: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
691: <!-- Fichas Arquivadas (após marcar caução pago) -->
700: <!-- Form de Adicionar Motorista -->
795: <!-- Barra de baixo do dono (só no design novo) -->
806: <!-- MODAL PRIMEIRO LOGIN -->
807: #modalFirstLogin
841: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
842: #modalNotif
855: <!-- MODAL VISTORIA (MASTER) -->
856: #modalInspection
869: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
870: #modalSettings
1003: <!-- MODAL TEMAS -->
1004: #modalThemes
1015: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1016: #modalCreds
1031: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1046: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1047: #modalDriverFile
1089: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1093: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1122: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1137: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1179: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1180: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1181: #modalRecibo
1200: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1201: #modalPixArea
1217: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1218: #modalIA
1300: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1301: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1302: #modalEditVeh
1339: #modalSenha
1361: #modalMeusRecibos
1379: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1380: #modalEmail
1400: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1401: #modalReport
1416: #modalFinCardDetail
1429: #modalFinance
1462: <!-- FILTROS -->
1512: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1532: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1533: #modalExpenses
1568: <!-- MODAL NOVO PIX -->
1569: #modalNewPix
1621: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1679: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1680: #modalCorrigirRecibo
1694: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1695: #modalContractWizard
1711: <!-- Seleção Motorista & Veículo -->
1723: <!-- Locador -->
1744: <!-- Locatário -->
1765: <!-- Veículo -->
1788: <!-- Configuração Comercial -->
1864: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1932: <!-- Cláusulas editáveis -->
1944: <!-- Prévia -->
1958: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1959: #modalContractDetail
1972: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1973: #modalInspectionTerm
2034: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2057: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2097: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2098: #modalInspectionTermDetail
2111: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2112: #modalInspDamageConfirm
2127: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2128: #modalDocViewer
2136: #modalDocBody
2137: <!-- Conteúdo pré-visualizado -->
2143: #modalTerms
2157: <!-- NOTIFICAÇÕES TOAST -->
2174: lsGet()
2175: lsSet()
2176: lsDel()
2199: demoLoginRole()
2203: demoId()
2204: demoSave()
2205: demoSaved()
2207: *datas no horário de Brasília*
2208: demoLocal()
2209: demoParts()
2210: demoDay()
2211: demoNextDue()
2216: *dados fictícios (4 meses)*
2217: demoBuild()
2450: *documentos fictícios (imagem gerada na hora)*
2451: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2452: demoDocBlob()
2530: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2531: demoQuery()
2554: out()
2560: run()
2601: demoOnUpdate()
2611: demoOnInsert()
2723: demoClient()
2916: demoStart()
2924: demoStop()
2930: abrirDemo()
2937: trocarDemo()
2942: demoBanner()
2957: toEmail()
2961: showLogin()
2965: esc()
2970: dataHoraBR()
2978: uiDialogo()
3026: uiConfirm()
3035: uiPrompt()
3041: friendlyError()
3051: devicePrefs()
3054: saveDevicePrefs()
3057: docRef()
3058: viewDocIdx()
3060: setBusy()
3103: **TEMAS**
3112: currentTheme()
3117: applyTheme()
3118: openThemes()
3128: pickTheme()
3134: toggleDarkMode()
3136: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3138: loadDesignCfg()
3145: applyDesign()
3162: markMasterNav()
3169: fillDesignCfg()
3174: saveDesign()
3188: showToast()
3197: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3198: senhaErro()
3199: abrirSenha()
3208: salvarIaCodigo()
3218: fecharSenha()
3219: salvarSenha()
3240: loginUserInput()
3245: loginErro()
3249: verSenha()
3254: handleLogin()
3303: logout()
3322: saveFirstLoginPreferences()
3345: carregarDados()
3377: aplicarDados()
3418: loadAndRender()
3445: autoRefresh()
3484: markUpdated()
3489: reload()
3494: renderApp()
3542: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3545: masterBack()
3547: viewAsDriver()
3569: exitViewAs()
3588: viewOnly()
3589: renderViewAsBanner()
3599: showSection()
3604: withBtn()
3612: toggleDriverStatus()
3621: isOnline()
3623: updateStatusToggleUI()
3636: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3645: checkApkUpdate()
3660: updateInstallApkButton()
3680: renderDriverPanel()
3938: switchDriverTab()
3953: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3956: parsePixKey()
3960: normalizePixKey()
3968: pixKeyLooksOk()
3976: togglePixKeyFields()
3982: updatePixKeyPlaceholder()
3988: copyPixKey()
3995: copyPixCode()
4007: receiptBadge()
4017: receiptMasterBox()
4044: receiptAction()
4051: confirmReceipt()
4080: rejectReceipt()
4092: recheckReceipt()
4101: uploadReceipt()
4124: switchMasterTab()
4143: maskPhone()
4152: waLink()
4157: allVeh()
4158: allDrv()
4159: chargeVehicleId()
4171: enviarPedidoParcialAsaas()
4187: pedirPixParcial()
4205: restaurarPixTotal()
4211: responderPixParcial()
4235: contrato30Info()
4265: encerrarContrato()
4282: encerrarContratoPrompt()
4295: reativarContrato()
4319: marcarCaucaoPagoArquivar()
4340: desarquivarFicha()
4358: deliveryInspectionHtml()
4397: uploadDeliveryPhotos()
4424: delDeliveryPhoto()
4442: addCauDesconto()
4467: puxarMultaCaucao()
4488: delCauDesconto()
4510: dfCauDescontosHtml()
4543: dfContratoRender()
4587: encerrarContratoConfirmFicha()
4594: renderMasterPanel()
4758: renderArchivedDrivers()
4803: handleAddVehicle()
4843: deleteVehicle()
4844: cancelDeleteVehicle()
4846: confirmDeleteVehicle()
4870: abrirEditarVeiculo()
4892: evReadStoredCrlv()
4917: evReadChosenCrlv()
4933: fecharEditarVeiculo()
4934: salvarEditarVeiculo()
4971: drvCauMostra()
4978: drvCauLer()
4986: handleAddDriver()
5064: marcarSituacao()
5074: updateDriverPaymentStatus()
5083: deleteDriver()
5084: cancelDeleteDriver()
5086: confirmDeleteDriver()
5108: isImageFile()
5110: prepareFile()
5132: uploadFile()
5143: fileUrl()
5154: downloadName()
5158: renderFilePreview()
5178: renderPdfToCanvas()
5205: viewDoc()
5226: **DINHEIRO**
5227: parseMoney()
5234: fmtMoney()
5235: fmtDate()
5236: todayISO()
5238: **CONFIGURAÇÕES (Gemini e Google Drive)**
5240: loadConfigStatus()
5245: paintConfig()
5250: fillOwnerVehicleSelect()
5256: saveOwnerVehicle()
5278: locadorMerged()
5291: getLocadoresList()
5311: locadorForVehicle()
5320: fillLocadorSettings()
5340: cfgOnLocadorChange()
5341: upsertLocadorInList()
5371: deleteLocadorSetting()
5387: saveLocadorSettings()
5415: openSettings()
5430: closeSettings()
5431: saveConfig()
5441: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5442: renderAsaasDrivers()
5469: toggleDriverAsaas()
5501: getAtrasoCfg()
5505: fillAtrasoCfg()
5512: saveAtrasoCfg()
5529: atrasoDataBR()
5534: atrasoPrazoUtil()
5541: calcEncargosAtraso()
5560: ehLinhaEncargo()
5561: calcAtrasoMotorista()
5591: atualizarPixAtraso()
5604: loadAsaasInfo()
5618: saveAsaas()
5626: testarAsaas()
5633: copiarAsaas()
5637: testDrive()
5644: resyncDrive()
5652: **FICHA DO MOTORISTA**
5655: openDriverFile()
5687: closeDriverFile()
5689: saveDriverFile()
5754: aiFillDriver()
5793: **CONTROLE FINANCEIRO**
5794: finRange()
5811: dayBR()
5812: inRange()
5814: onFinPeriodChange()
5820: fillFinFilters()
5828: clearFinFilters()
5832: updateFinFilterCount()
5841: openFinance()
5847: switchFinTab()
5858: finCardBtn()
5866: closeFinCardDetail()
5867: closeFinance()
5869: collectRentFinData()
5920: renderFinance()
5978: openFinCardDetail()
6185: openFinExtrato()
6279: renderFinExtratoView()
6360: openFinExtratoReport()
6377: renderFinGrafico()
6397: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6399: okEmail()
6401: openEmailCompose()
6422: closeEmailCompose()
6423: sendEmailCompose()
6438: emailRecibo()
6443: emailIA()
6451: **RELATÓRIO DO FINANCEIRO**
6453: finFiltersText()
6458: finPeriodText()
6465: buildReportHtml()
6487: openFinReport()
6497: closeFinReport()
6498: printFinReport()
6502: shareFinReport()
6512: emailFinReport()
6518: **DESPESAS DO VEÍCULO**
6520: openExpenses()
6532: closeExpenses()
6533: fillExpenseTypes()
6538: createExpenseType()
6553: aiReadExpense()
6585: renderExpenses()
6607: saveExpense()
6634: deleteExpense()
6663: inspSlotLabel()
6666: normalizeInspDbSlot()
6669: photoDamageBadge()
6678: buildVehicleInspectionReport()
6715: copyVehicleInspectionText()
6723: photoCard()
6765: inspectionHtml()
6845: hydrateImages()
6851: openInspection()
6859: closeInspection()
6863: renderInspectionModal()
6870: uploadInspection()
6927: deleteInspectionPhoto()
6947: fmtDue()
6953: nextDueLocal()
6964: openNewPix()
6994: **CAUÇÃO DO MOTORISTA**
6995: cauOf()
6996: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6997: devOf()
6998: devCobrancas()
7000: devPrevisao()
7008: dfDevRender()
7035: dfDevIr()
7036: dfDevSalvar()
7041: dfDevAvisar()
7047: dfDevDesfazer()
7051: dfDevReceber()
7060: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7064: cauPlano()
7072: cauParcela()
7079: cauParcelasTexto()
7083: cauNext()
7090: dfCauFill()
7100: dfCauCalc()
7128: dfCauRead()
7141: expTypeName()
7145: driverFinVehicleId()
7157: cauEntradaItem()
7171: cauPagoDespesaItem()
7186: **CAUÇÃO: quanto já foi pago**
7188: cauStatus()
7198: obsResumoHtml()
7199: cauResumoHtml()
7204: **MULTAS E OUTRAS DESPESAS**
7205: multasOf()
7207: multaPagaAuto()
7212: multasAbertas()
7213: multasPendentes()
7214: multasResumoHtml()
7222: cobOf()
7223: dfCobFill()
7229: dfCobRead()
7232: dfCobInfo()
7242: cobResumoHtml()
7246: ajustesOf()
7250: ajusteVale()
7251: isoDia()
7253: vencProxima()
7254: previsaoProxima()
7268: previsaoHtml()
7272: dfAjRender()
7278: addAjuste()
7287: delAjuste()
7292: abrirAjustes()
7293: renderProxCobrancas()
7299: savePixExtra()
7307: dfMultFill()
7315: fdPaga()
7316: dfMultRender()
7325: toggleMultas()
7332: addMulta()
7342: delMulta()
7350: multaPaga()
7359: renderDriverExtras()
7387: mondayAfter()
7395: renderDriverProfileExtras()
7461: semanaDoPix()
7467: **MEUS RECIBOS (área do motorista)**
7469: meusRecibosLista()
7473: reciboRowHtml()
7481: renderEncerradoRecibos()
7486: openMeuReciboDireto()
7487: openMeusRecibos()
7494: closeMeusRecibos()
7495: reciboPdfHtml()
7506: verMeuRecibo()
7513: voltarMeusRecibos()
7514: pdfMeuRecibo()
7518: shareMeuRecibo()
7527: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7528: editVehicleRent()
7545: nextParcel()
7551: fillNewPixValues()
7587: newPixParts()
7618: **PERÍODO E VENCIMENTO DA COBRANÇA**
7619: dataISO()
7620: dataDe()
7621: dataMais()
7622: dataBR()
7623: diasEntre()
7624: isoSP()
7625: pixPeriodo()
7632: pixDesc()
7633: pixDiasPeriodo()
7638: marcarAjustesPorVenc()
7643: pixDatasNovo()
7652: pixDatasMudou()
7663: pixAluguelProporcional()
7671: pixPeriodoInfo()
7684: pixAddLinha()
7691: pixLinhas()
7693: descSoma()
7703: calcNewPix()
7712: **RECIBO DE PAGAMENTO**
7716: receiptValue()
7717: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7718: atrasoDados()
7722: cobrarAtraso()
7739: allocatePix()
7758: reciboData()
7781: fmtDateTimeBR()
7782: reciboTexto()
7833: openRecibo()
7850: closeRecibo()
7851: **CORRIGIR RECIBO**
7853: corrigirLinhaHtml()
7863: openCorrigirRecibo()
7886: closeCorrigirRecibo()
7887: corrigirLer()
7893: corrigirSoma()
7900: salvarCorrigirRecibo()
7917: copyRecibo()
7922: reciboCanvas()
7939: reciboPdfBlob()
7957: shareReciboPdf()
7973: rotularTabelas()
7991: areaAberta()
7992: markAreas()
8002: closeAreas()
8006: toggleArea()
8014: dobraSalva()
8015: setDobra()
8020: toggleDobra()
8027: dobraTopo()
8034: renderMasterResumo()
8048: renderMasterTopo()
8070: loadIA()
8092: updateIABadge()
8097: loadIASetting()
8103: paintIASwitch()
8109: toggleIA()
8116: loadRobo()
8125: iaPrepararQr()
8130: paintRobo()
8159: pedirCodigoRobo()
8168: toggleRobo()
8183: iaTodosGerar()
8201: iaTodosCancelar()
8205: iaTodosConfirmar()
8219: loadIARules()
8224: iaAbrirPdf()
8230: renderIARules()
8234: saveIARules()
8239: addIARule()
8244: delIARule()
8248: openIA()
8263: closeIA()
8264: iaShow()
8265: iaPhone()
8270: renderIA()
8312: iaAprovar()
8321: iaPhone2()
8322: iaSend()
8353: iaMark()
8364: iaDelete()
8375: openPixArea()
8384: closePixArea()
8385: renderPixArea()
8429: openEditPix()
8458: deletePix()
8470: closeNewPix()
8472: saveNewPix()
8563: pushSupported()
8564: isIOS()
8565: isStandalone()
8566: b64ToBytes()
8572: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8577: notifStatus()
8585: stepsList()
8589: notifHelpHtml()
8623: renderNotifModal()
8635: checkDriverNotifications()
8668: activateFromModal()
8681: refreshNotifButton()
8700: subscribePush()
8715: enableNotifications()
8735: closeDocViewer()
8743: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8755: allFeaturesOn()
8756: feat()
8757: loadDriverFeatures()
8764: saveDriverFeatures()
8769: drawFeatureToggles()
8784: setAllFeatures()
8795: applyDriverFeatures()
8810: **PIX: conferência do código e QR code desenhado no aparelho**
8811: crc16()
8819: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8821: pixTxt()
8822: pixCampo()
8823: pixGerarCodigo()
8833: pixAutoLigado()
8834: pixAutoMudou()
8839: gerarPixAuto()
8855: pixRecebedorCarregar()
8866: pixRecebedorGuardar()
8873: pixValid()
8879: renderPixQr()
8889: previewNewPixQr()
8899: **FOTO DO MOTORISTA (recortada da CNH)**
8900: photoPath()
8901: fileToCanvas()
8920: cropPhoto()
8934: savePhoto()
8939: photoBoxFrom()
8945: fillAvatar()
8956: fillAvatars()
8969: storedFile()
8976: photoFromCnh()
8988: **FOTO DO PERFIL ACOMPANHA A CNH**
8991: cnhStamp()
8992: photoFiles()
9000: avatarPath()
9005: syncCnhPhotos()
9029: pickImage()
9032: changeDriverPhoto()
9048: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9050: uploadTmp()
9057: clearTmp()
9062: aiReadFiles()
9068: okDateISO()
9070: noAccents()
9072: makeUsername()
9081: titleCase()
9082: syncNewDriverAccess()
9088: setNewDriverPhoto()
9093: pickNewDriverPhoto()
9097: resetNewDriverForm()
9105: newDriverDocChosen()
9139: anoCrlv()
9143: formatVehicleBrand()
9148: inferVehicleBrand()
9157: normalizeCrlvFields()
9176: applyCrlvFields()
9189: aiReadCrlv()
9203: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9204: sendWelcomeEmail()
9210: showCredentials()
9221: demoAssistente()
9240: **PERGUNTAR À IA (ÁREA IA, só o master)**
9244: iaChatReset()
9245: iaNorm()
9246: iaAcha()
9252: iaVeicTxt()
9253: iaCamposVeic()
9254: iaDataOk()
9255: iaOpcoes()
9256: iaTodosMotoristas()
9260: iaFerramenta()
9355: renderIAChat()
9372: iaChatDica()
9373: iaChatEnviar()
9408: iaChatNota()
9409: iaCancelarCartao()
9410: iaConfirmarCartao()
9455: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9456: syncAppFinState()
9465: renderAppEarnings()
9545: saveAppEarning()
9572: workDayISO()
9573: paintDayOff()
9582: renderDayOff()
9589: setDayOff()
9599: aiReadEarning()
9632: **DESPESAS DO APLICATIVO**
9634: appExpCustomTypes()
9635: fillAppExpTypes()
9642: onAppExpTypeChange()
9647: saveAppExpense()
9672: deleteAppExpense()
9681: deleteAppEarning()
9778: loadTermsAcceptances()
9790: termsOf()
9791: currentAcceptance()
9792: needsTermsAcceptance()
9795: fmtDateTime()
9798: termsPlainText()
9802: termsHash()
9810: openTermsGate()
9833: termsGateCheck()
9841: acceptTerms()
9861: acceptanceHtml()
9872: openTermsViewer()
9890: closeTerms()
9896: downloadTermsCopy()
9917: termsBadgeMaster()
9924: termsMasterDetail()
9965: renderTermsSetupBanner()
9978: copyTermsSql()
9988: cnhExpired()
9989: cnhWaiting()
9990: onlyDigits()
9991: normName()
9993: verifyCnh()
10005: renderCnhBanner()
10023: sendNewCnh()
10071: cnhBadgeMaster()
10079: applyPendingCnh()
10087: autoReadNewCnhs()
10105: cnhPendingHtml()
10119: recheckPendingCnh()
10129: rejectPendingCnh()
10139: showContractDoc()
10257: inspectPdfSignaturesBytes()
10276: readPdfFileAsBase64AndInspect()
10291: govBrSignersList()
10303: renderGovBrFlowBox()
10355: driverGovBrBlockHtml()
10384: govBrPublicAppBaseUrl()
10388: createGovBrInvite()
10420: submitMasterGovBrPdf()
10441: submitDriverGovBrPdf()
10460: loadGovBrInvitePage()
10531: submitGovBrInvitePdf()
10550: exitGovBrInviteToLogin()
10569: contractPeriodLabel()
10570: contractStatusBadge()
10574: pdfSafeText()
10586: contractPdfFileName()
10595: cwBuildDepositChargeText()
10637: cwBuildDepositClauseText()
10649: lcClauseStart()
10656: buildDefaultClauses()
10727: generateContractPdfBytes()
10746: drawHeader()
10751: newPage()
10758: ensureSpace()
10761: wrapLines()
10785: drawJustifiedLine()
11051: renderContractsTab()
11105: renderDriverRentalContractsBox()
11164: openContractForDriver()
11171: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11173: closeContractWizard()
11174: cwPopulateSelects()
11182: cwPopulateLocadores()
11194: cwOnLocadorChange()
11203: defaultWitness1ForLocador()
11211: cwApplyDefaultWitness1()
11224: cwFillLocador()
11233: cwFillDepositFromDriver()
11261: cwFillDepositFromComercial()
11283: cwSyncClauseIdx()
11292: cwSyncDepositClauseOnly()
11293: cwUpdateTrialPreview()
11309: cwDepCalc()
11354: cwApplyDriverContractDefaults()
11371: cwFillDriver()
11390: cwUpdateCrlvBar()
11399: cwNeedsCrlvFill()
11403: cwRefreshMissingBoxIfVisible()
11412: cwReadVehicleCrlv()
11461: cwReadCurrentVehicleCrlv()
11467: cwFillVehicle()
11489: cwOnDriverChange()
11505: cwOnVehicleChange()
11518: cwDefaultChecklist()
11523: cwToggleVistoriaFields()
11528: cwRenderInspChecklist()
11547: cwRenderInspDamagesSummary()
11561: cwRenderInspPhotos()
11598: cwUpdateInspPhotoDamage()
11606: cwSyncVistoriaFromVehicle()
11623: cwImportSavedPhotos()
11639: cwUploadInspPhotos()
11679: cwAnalyzeInspWithAI()
11688: cwReadSnapshot()
11747: cwRenderClausesEditor()
11757: cwRebuildClauses()
11765: cwRenderPreview()
11820: cwTogglePreview()
11825: validateContractForEmission()
11842: openContractWizard()
11978: cwSyncSources()
12033: logContractHistory()
12042: persistContract()
12133: saveContractDraft()
12134: emitContract()
12136: ensureContractPdfBlob()
12147: downloadContractPdf()
12159: printContractPdf()
12172: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12173: closeContractDetail()
12174: openContractDetail()
12246: saveContractSignatures()
12273: uploadSignedContractFile()
12295: terminateContractPrompt()
12310: cancelContractPrompt()
12350: inspectionTypeBadge()
12354: inspectionStatusBadge()
12358: inspectionPdfFileName()
12365: switchContractsSubtab()
12378: renderInspectionsTab()
12438: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12439: runInspectionBatchAI()
12462: promptInspectionDamageConfirmation()
12540: processInspectionPhotosWithAI()
12596: analyzeSavedInspectionPhotos()
12612: renameInspectionPhoto()
12628: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12631: closeInspectionWizard()
12632: openInspectionWizard()
12699: iwCollectSavedPhotosFor()
12732: iwPopulateContractsAndBase()
12755: iwSyncHeaderAndLegal()
12767: iwOnTypeChange()
12773: iwOnVehicleChange()
12791: iwOnDriverChange()
12796: iwOnContractChange()
12803: iwImportSavedPhotos()
12814: iwUploadPhotos()
12867: iwResolveEntregaBaseline()
12888: iwRunAIOnList()
12914: iwAnalyzeWithAI()
12921: iwRenderPhotos()
12960: iwUpdatePhotoField()
12965: iwUpdatePhotoDamage()
12973: iwRemovePhoto()
12979: iwRenderDamagesSummary()
12994: iwRenderComparison()
13013: iwRenderChecklist()
13032: persistInspectionTerm()
13135: saveInspectionDraft()
13136: emitInspectionTerm()
13138: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13139: blobToEmbeddableJpeg()
13169: embedBlobIntoPdf()
13182: generateInspectionPdfBytes()
13382: ensureInspectionPdfBlob()
13392: downloadInspectionPdf()
13404: printInspectionPdf()
13417: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13418: closeInspectionDetail()
13419: openInspectionDetail()
13479: saveInspectionSignatures()
13505: uploadSignedInspectionFile()
13527: cancelInspectionPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assinatura/index.ts (490 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
91: publicDocSummary()
128: authUser()

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (443 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
